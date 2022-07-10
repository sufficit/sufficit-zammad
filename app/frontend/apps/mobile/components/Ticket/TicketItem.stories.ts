// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { TicketState } from '@shared/entities/ticket/types'
import createTemplate from '@stories/support/createTemplate'
import TicketItem, { type Props } from './TicketItem.vue'

export default {
  title: 'Ticket/TicketItem',
  component: TicketItem,
}

const Template = createTemplate<Props>(TicketItem)

const ticket = {
  id: '54321',
  number: '12345',
  state: TicketState.Open,
  title: 'Test Ticket',
  owner: {
    firstname: 'John',
    lastname: 'Doe',
  },
}

export const Default = Template.create({
  entity: {
    ...ticket,
    updatedAt: new Date(2022, 1, 2).toISOString(),
    updatedBy: {
      id: '456',
      firstname: 'Jane',
      lastname: 'Doe',
    },
    priority: {
      name: 'HIGH',
    },
  },
})

export const NoEdit = Template.create({
  entity: ticket,
})
