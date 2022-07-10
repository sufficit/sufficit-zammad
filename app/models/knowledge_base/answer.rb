# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

class KnowledgeBase::Answer < ApplicationModel
  include HasTranslations
  include HasAgentAllowedParams
  include HasTags
  include CanBePublished
  include ChecksKbClientNotification
  include ChecksKbClientVisibility
  include CanCloneAttachments

  AGENT_ALLOWED_ATTRIBUTES       = %i[category_id promoted internal_note].freeze
  AGENT_ALLOWED_NESTED_RELATIONS = %i[translations].freeze

  belongs_to :category, class_name: 'KnowledgeBase::Category', inverse_of: :answers, touch: true

  scope :include_contents, -> { eager_load(translations: :content) }
  scope :sorted,           -> { order(position: :asc) }

  acts_as_list scope: :category, top_of_list: 0

  # provide consistent naming with KB category
  alias_attribute :parent, :category

  alias assets_essential assets

  def attributes_with_association_ids
    attrs = super
    attrs[:attachments] = attachments_sorted.map { |elem| self.class.attachment_to_hash(elem) }
    attrs[:tags]        = tag_list
    attrs
  end

  def assets(data = {})
    return data if assets_added_to?(data)

    data = super(data)
    data = category.assets(data)

    # include all siblings to make sure ordering is always up to date. Reader gets only accessible siblings.
    data = ApplicationModel::CanAssets.reduce(assets_siblings, data)

    ApplicationModel::CanAssets.reduce(translations, data)
  end

  attachments_cleanup!

  def attachments_sorted
    attachments.sort_by { |elem| elem.filename.downcase }
  end

  def add_attachment(file)
    filename     = file.try(:original_filename) || File.basename(file.path)
    content_type = file.try(:content_type) || MIME::Types.type_for(filename).first&.content_type || 'application/octet-stream'

    Store.create!(
      object:      self.class.name,
      o_id:        id,
      data:        file.read,
      filename:    filename,
      preferences: { 'Content-Type': content_type }
    )

    touch # rubocop:disable Rails/SkipsModelValidations
    translations.each(&:touch)

    true
  end

  def remove_attachment(attachment_id)
    attachment = attachments.find { |elem| elem.id == attachment_id.to_i }

    raise ActiveRecord::RecordNotFound if attachment.nil?

    Store.remove_item(attachment.id)

    touch # rubocop:disable Rails/SkipsModelValidations
    translations.each(&:touch)

    true
  end

  def api_url
    Rails.application.routes.url_helpers.knowledge_base_answer_path(category.knowledge_base, self)
  end

  # required by CanCloneAttachments
  def content_type
    'text/html'
  end

  private

  def assets_siblings(siblings: category.answers, current_user: User.lookup(id: UserInfo.current_user_id))
    if KnowledgeBase.granular_permissions?
      ep = KnowledgeBase::EffectivePermission.new current_user, category

      case ep.access_effective
      when 'public_reader'
        siblings.published
      when 'none'
        siblings.none
      when 'reader'
        siblings.internal
      else
        siblings
      end
    elsif !current_user&.permissions?('knowledge_base.editor')
      siblings.internal
    else
      siblings
    end
  end

  def touch_translations
    translations.each(&:touch) # move to #touch_all when migrationg to Rails 6
  end
  after_touch :touch_translations

  class << self
    def attachment_to_hash(attachment)
      url = Rails.application.routes.url_helpers.attachment_path(attachment.id)

      {
        id:          attachment.id,
        url:         url,
        preview_url: "#{url}?preview=1",
        filename:    attachment.filename,
        size:        attachment.size,
        preferences: attachment.preferences
      }
    end
  end
end
