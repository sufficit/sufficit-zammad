# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

<<<<<<< HEAD
class ObjectManagerUpdateUserPassword < ActiveRecord::Migration[6.0]
=======
class ObjectManagerUpdateUserPassword < ActiveRecord::Migration[6.1]
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
  def up
    # return if it's a new setup
    return if !Setting.exists?(name: 'system_init_done')

    UserInfo.current_user_id = 1

    object_type = ObjectLookup.find_by(name: 'User')
    attr        = ObjectManager::Attribute.find_by object_lookup_id: object_type.id, name: 'password'

    # password length is capped at 1000 in PasswordPolicy::MaxLength::MAX_LENGTH
    # if user copy-pastes a very long string
    # this ensures that max length check is triggered preventing saving of truncated password
    attr.data_option[:maxlength] = 1001
    attr.save!
  end
end
