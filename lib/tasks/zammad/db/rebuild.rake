# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

namespace :zammad do

  namespace :db do

    desc 'Clears the Cache and reloads the Settings'
    task rebuild: :environment do
      Package::Migration.linked
      ActiveRecord::Base.connection.reconnect!
      ActiveRecord::Base.descendants.each(&:reset_column_information)
      Rails.cache.clear
      EventBuffer.reset('transaction')
      Setting.reload
    end
  end
end
