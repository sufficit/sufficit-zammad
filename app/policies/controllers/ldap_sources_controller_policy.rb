# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

class Controllers::LdapSourcesControllerPolicy < Controllers::ApplicationControllerPolicy
  default_permit!('admin.integration.ldap')
end
