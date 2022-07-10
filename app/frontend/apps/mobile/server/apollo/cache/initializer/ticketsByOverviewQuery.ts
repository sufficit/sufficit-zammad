// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { InMemoryCacheConfig } from '@apollo/client/cache/inmemory/types'
import registerRelayStylePagination from '@shared/server/apollo/cache/utils/registerRelayStylePagination'

export default function register(
  config: InMemoryCacheConfig,
): InMemoryCacheConfig {
  return registerRelayStylePagination(config, 'ticketsByOverview', [
    'overviewId',
    'orderBy',
    'orderDirection',
  ])
}
