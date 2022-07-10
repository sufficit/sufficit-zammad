# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

require 'rails_helper'

RSpec.describe Gql::Mutations::Form::UploadCache::Add, type: :graphql do

  context 'when uploading files for a form', authenticated_as: :agent do
    let(:agent)        { create(:agent) }
    let(:query)        { read_graphql_file('shared/components/Form/fields/FieldFile/graphql/mutations/uploadCache/add.graphql') }
    let(:form_id)      { 12_345 }
    let(:file_name)    { 'my_testfile.pdf' }
    let(:file_type)    { 'application/pdf' }
    let(:file_content) { 'some test content' }
    let(:variables) do
      {
        formId: form_id,
        files:  [
          {
            name:    file_name,
            type:    file_type,
            content: Base64.strict_encode64(file_content),
          }
        ]
      }
    end

    let(:expected_response) do
      [{
        'id'   => Gql::ZammadSchema.id_from_object(UploadCache.new(form_id).attachments.first),
        'name' => file_name,
        'type' => file_type,
      }]
    end

    before do
      graphql_execute(query, variables: variables)
    end

    it 'creates Store entry' do
      expect(graphql_response['data']['formUploadCacheAdd']['uploadedFiles']).to eq(expected_response)
    end

    it_behaves_like 'graphql responds with error if unauthenticated'
  end
end
