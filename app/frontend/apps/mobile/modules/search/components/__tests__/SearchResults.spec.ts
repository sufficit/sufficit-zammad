// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import type { OrganizationItemData } from '@mobile/components/Organization/types'
import { renderComponent } from '@tests/support/components'

import SearchResults from '../SearchResults.vue'

describe('renders search result', () => {
  it('renders organization', async () => {
    const org: OrganizationItemData = {
      name: 'organization',
      id: '123',
      ticketsCount: 2,
      active: true,
    }

    // will be needed when permissions are implemented for default plugins
    // mockPermissions(['admin.organization'])

    const view = renderComponent(SearchResults, {
      props: {
        data: [org],
        type: 'organization',
      },
      store: true,
      router: true,
    })

    // checking name is enough, because the component is tested elsewhere
    const organization = view.getByText('organization')

    expect(organization).toBeInTheDocument()

    expect(view.getLinkFromElement(organization)).toHaveAttribute(
      'href',
      '/organizations/123',
    )
  })
})
