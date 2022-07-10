# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

require 'rails_helper'

RSpec.describe Sequencer::Unit::Import::Freshdesk::TimeEntry::Available, sequencer: :unit do

  context 'when checking the availability of the time entry feature' do

    let(:params) do
      {
        dry_run:    false,
        import_job: instance_double(ImportJob),
        field_map:  {},
        id_map:     {},
      }
    end

<<<<<<< HEAD
    let(:response_ok) { Net::HTTPOK.new(1.0, '200', 'OK') }
=======
    let(:response_ok)        { Net::HTTPOK.new(1.0, '200', 'OK') }
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    let(:response_forbidden) { Net::HTTPUnauthorized.new(1.0, '403', 'Forbidden') }

    it 'check for avilable time entry feature' do
      allow(described_class).to receive(:perform_request).with(any_args).and_return(response_ok)
      expect(process(params)).to eq({ time_entry_available: true })
    end

    it 'check for not available time entry feature' do
      allow(described_class).to receive(:perform_request).with(any_args).and_return(response_forbidden)
      expect(process(params)).to eq({ time_entry_available: false })
    end
  end
end
