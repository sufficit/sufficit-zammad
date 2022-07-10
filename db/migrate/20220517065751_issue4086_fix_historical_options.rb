# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

<<<<<<< HEAD
class Issue4086FixHistoricalOptions < ActiveRecord::Migration[5.0]
=======
class Issue4086FixHistoricalOptions < ActiveRecord::Migration[6.1]
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
  def change
    # return if it's a new setup
    return if !Setting.exists?(name: 'system_init_done')

    ObjectManager::Attribute.find_each do |attribute|
      next if !%r{^(multi|tree_)?select$}.match?(attribute.data_type)

      attribute.data_option[:historical_options] = ObjectManager::Attribute.data_options_hash(attribute.data_option[:historical_options] || {})
      attribute.save
    end
  end
end
