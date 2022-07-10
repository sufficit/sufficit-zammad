# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

require 'rails_helper'
require 'lib/sequencer/unit/import/zendesk/object_attribute/attribute_type/base_examples'

RSpec.describe Sequencer::Unit::Import::Zendesk::ObjectAttribute::AttributeType::Checkbox do
  it_behaves_like Sequencer::Unit::Import::Zendesk::ObjectAttribute::AttributeType::Base do
    let(:zendesk_object_field_type) { 'checkbox' }
<<<<<<< HEAD
    let(:object_attribute_type) { 'boolean' }
=======
    let(:object_attribute_type)     { 'boolean' }
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    let(:object_attribute_data_option) do
      {
        null:    false,
        note:    'Example attribute description',
        default: false,
        options: {
          true  => 'yes',
          false => 'no'
        }
      }
    end
  end
end
