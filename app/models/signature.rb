# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

class Signature < ApplicationModel
  include ChecksHtmlSanitized
  include HasCollectionUpdate

  has_many  :groups,  after_add: :cache_update, after_remove: :cache_update
  validates :name,    presence: true

  sanitized_html :body, :note

  collection_push_permission('ticket.agent')
end
