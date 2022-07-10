require 'rails_helper'

RSpec.describe 'Ticket::Article::EnqueueCommunicateQuepasaJob', performs_jobs: true do
  before { allow(Delayed::Job).to receive(:enqueue).and_call_original }

  let(:article) { create(:ticket_article, **(try(:factory_options) || {})) }

  shared_examples 'for no-op' do
    it 'is a no-op' do
      expect { article }.not_to have_enqueued_job(CommunicateQuepasaJob)
    end
  end

  shared_examples 'for success' do
    it 'enqueues the Quepasa background job' do
      expect { article }.to have_enqueued_job(CommunicateQuepasaJob)
    end
  end

  context 'when in Import Mode' do
    before { Setting.set('import_mode', true) }

    include_examples 'for no-op'
  end

  context 'when article is created during Channel::EmailParser#process', application_handle: 'scheduler.postmaster' do
    include_examples 'for no-op'
  end

  context 'when article is from a customer' do
    let(:factory_options) { { sender_name: 'Customer' } }

    include_examples 'for no-op'
  end

  context 'when article is a Quepasa message' do
    let(:factory_options) { { sender_name: 'Agent', type_name: 'quepasa personal-message' } }

    include_examples 'for success'
  end
end
