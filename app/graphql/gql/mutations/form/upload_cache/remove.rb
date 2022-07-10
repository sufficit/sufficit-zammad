# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

module Gql::Mutations
  class Form::UploadCache::Remove < BaseMutation
    description 'Remove uploaded files for a form'

    argument :form_id, Gql::Types::FormIdType, 'FormID for the uploads.'
    argument :file_ids, [GraphQL::Types::ID], 'Files to be uploaded.'

    field :success, Boolean, null: false, description: 'Was the mutation successful?'

    def resolve(form_id:, file_ids:)
      cache = UploadCache.new(form_id)
      file_ids.map { |file_id| cache.remove_item(Gql::ZammadSchema.object_from_id(file_id).id) }
      { success: true }
    end

  end
end
