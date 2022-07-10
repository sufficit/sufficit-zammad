# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

RSpec.configure do |config|
  config.after(:each, type: :system) do
    next if page.driver.browser.browser != :chrome

<<<<<<< HEAD
    errors = page.driver.browser.manage.logs.get(:browser).select { |m| m.level == 'SEVERE' && m.to_s =~ %r{EvalError|InternalError|RangeError|ReferenceError|SyntaxError|TypeError|URIError} }
=======
    logs   = page.driver.browser.logs.get(:browser)
    errors = logs.select { |m| m.level == 'SEVERE' && m.to_s =~ %r{EvalError|InternalError|RangeError|ReferenceError|SyntaxError|TypeError|URIError} }
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    if errors.present?
      Rails.logger.error "JS ERRORS: #{errors.to_json}"
      errors.each do |error|
        puts "#{error.message}\n\n"
      end
<<<<<<< HEAD
=======

      File.write(Rails.root.join('log/browser.log'), logs.map { |l| "#{l.level}|#{l.message}" }.join("\n"))
>>>>>>> 979ea9caf03b644fdd6525e7af7179c102ee3ac4
    end

    expect(errors.length).to eq(0)
  end
end
