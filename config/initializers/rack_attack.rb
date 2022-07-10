# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

#
# Throttle password reset requests
#
API_V1_USERS__PASSWORD_RESET_PATH = '/api/v1/users/password_reset'.freeze
<<<<<<< HEAD
Rack::Attack.throttle('limit password reset requests per username', limit: 3, period: 60) do |req|
  if req.path == API_V1_USERS__PASSWORD_RESET_PATH && req.post?
=======
Rack::Attack.throttle('limit password reset requests per username', limit: 3, period: 1.minute.to_i) do |req|
  if req.path.start_with?(API_V1_USERS__PASSWORD_RESET_PATH) && req.post?
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    # Normalize to protect against rate limit bypasses.
    req.params['username'].to_s.downcase.gsub(%r{\s+}, '')
  end
end
<<<<<<< HEAD
Rack::Attack.throttle('limit password reset requests per source IP address', limit: 3, period: 60) do |req|
  if req.path == API_V1_USERS__PASSWORD_RESET_PATH && req.post?
    req.ip
  end
end
=======
Rack::Attack.throttle('limit password reset requests per source IP address', limit: 3, period: 1.minute.to_i) do |req|
  if req.path.start_with?(API_V1_USERS__PASSWORD_RESET_PATH) && req.post?
    req.ip
  end
end

#
# Throttle form submit requests
#
API_V1_FORM_SUBMIT_PATH = '/api/v1/form_submit'.freeze
form_limit_by_ip_per_hour_proc = proc { Setting.get('form_ticket_create_by_ip_per_hour') || 20 }
Rack::Attack.throttle('form submits per IP and hour', limit: form_limit_by_ip_per_hour_proc, period: 1.hour.to_i) do |req|
  if req.path.start_with?(API_V1_FORM_SUBMIT_PATH)
    req.ip
  end
end
form_limit_by_ip_per_day_proc = proc { Setting.get('form_ticket_create_by_ip_per_day') || 240 }
Rack::Attack.throttle('form submits per IP and day', limit: form_limit_by_ip_per_day_proc, period: 1.day.to_i) do |req|
  if req.path.start_with?(API_V1_FORM_SUBMIT_PATH)
    req.ip
  end
end
form_limit_per_day_proc = proc { Setting.get('form_ticket_create_per_day') || 5000 }
Rack::Attack.throttle('form submits per day', limit: form_limit_per_day_proc, period: 1.day.to_i) do |req|
  if req.path.start_with?(API_V1_FORM_SUBMIT_PATH)
    req.path
  end
end
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
