# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

<<<<<<< HEAD
class Issue4049FixObjectLookup < ActiveRecord::Migration[6.0]
=======
class Issue4049FixObjectLookup < ActiveRecord::Migration[6.1]
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
  def change
    # return if it's a new setup
    return if !Setting.exists?(name: 'system_init_done')

    ObjectLookup.find_by(name: 'SmimeCertificate')&.update(name: 'SMIMECertificate')
  end
end
