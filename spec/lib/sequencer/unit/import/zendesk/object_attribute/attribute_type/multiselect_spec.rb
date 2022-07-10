# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

require 'rails_helper'
require 'lib/sequencer/unit/import/zendesk/object_attribute/attribute_type/base_examples'

<<<<<<< HEAD
RSpec.describe Sequencer::Unit::Import::Zendesk::ObjectAttribute::AttributeType::Multiselect do
=======
RSpec.describe Sequencer::Unit::Import::Zendesk::ObjectAttribute::AttributeType::Multiselect, mariadb: true do
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
  it_behaves_like Sequencer::Unit::Import::Zendesk::ObjectAttribute::AttributeType::Base do
    let(:zendesk_object_field_attributes) do
      {
        custom_field_options: [
          {
            'id'    => 1,
            'value' => 'Key 1',
            'name'  => 'Value 1'
          },
          {
            'id'    => 2,
            'value' => 'Key 2',
            'name'  => 'Value 2'
          },
        ]
      }
    end
    let(:object_attribute_type) { 'multiselect' }
    let(:object_attribute_data_option) do
      {
        null:    false,
        note:    'Example attribute description',
        default: '',
        options: {
          'Key 1' => 'Value 1',
          'Key 2' => 'Value 2'
        },
      }
    end
  end
end
