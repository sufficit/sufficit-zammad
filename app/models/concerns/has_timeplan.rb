# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

module HasTimeplan
  extend ActiveSupport::Concern

  included do
    store :timeplan
  end

  def in_timeplan?(time = Time.zone.now)
    timeplan_calculation.contains?(time)
  end

  private

  def timeplan_calculation
    timezone = Setting.get('timezone_default').presence || 'UTC'

    TimeplanCalculation.new(timeplan, timezone)
  end
end
