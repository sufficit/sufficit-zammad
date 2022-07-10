# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

module Gql::Types::Ticket
  class StateType < Gql::Types::BaseObject
    include Gql::Concern::IsModelObject

    description 'Ticket states'

    belongs_to :state_type, Gql::Types::Ticket::StateTypeType, null: false

    field :name, String, null: false
    field :next_state_id, Integer, null: true
    field :ignore_escalation, Boolean, null: false
    field :default_create, Boolean, null: false
    field :default_follow_up, Boolean, null: false
    field :note, String, null: true
    field :active, Boolean, null: false
  end
end
