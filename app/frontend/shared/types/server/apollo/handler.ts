// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import type {
  UseMutationReturn,
  UseQueryReturn,
  UseQueryOptions,
  UseSubscriptionReturn,
  UseSubscriptionOptions,
} from '@vue/apollo-composable'
import type { Ref } from 'vue'
import { NotificationTypes } from '@shared/components/CommonNotifications'
import { PageInfo } from '@shared/graphql/types'
import type { GraphQLHandlerError } from '../../error'

export type OperationReturn<TResult, TVariables> =
  | UseQueryReturn<TResult, TVariables>
  | UseMutationReturn<TResult, TVariables>
  | UseSubscriptionReturn<TResult, TVariables>

export type OperationQueryOptionsReturn<TResult, TVariables> =
  | UseQueryOptions<TResult, TVariables>
  | Ref<UseQueryOptions<TResult, TVariables>>

export type OperationSubscriptionOptionsReturn<TResult, TVariables> =
  | UseSubscriptionOptions<TResult, TVariables>
  | Ref<UseSubscriptionOptions<TResult, TVariables>>

export type OperationSubscriptionsResult = {
  __typename?: 'Subscriptions'
  [key: string]: unknown
}

export type OperationQueryResult = {
  __typename?: 'Queries'
  [key: string]: unknown
}

export type OperationMutationResult = {
  __typename?: 'Mutations'
  [key: string]: unknown
}

export type BaseConnection = {
  __typename?: string
  pageInfo: PageInfo
  nodes?: Maybe<Array<Maybe<unknown>>>
  edges?: Maybe<Array<Maybe<unknown>>>
  totalCount: number
}

export type PaginationVariables = {
  cursor?: Maybe<string>
  pageSize?: Maybe<number>
}

export type OperationResult =
  | OperationQueryResult
  | OperationMutationResult
  | OperationSubscriptionsResult

export interface BaseHandlerOptions {
  errorShowNotification: boolean
  errorNotificationMessage: string
  errorNotificationType: NotificationTypes
  errorCallback?: (error: GraphQLHandlerError) => void
}

export type CommonHandlerOptions<TOptions> = BaseHandlerOptions & TOptions

export type CommonHandlerOptionsParameter<TOptions> =
  Partial<BaseHandlerOptions> & Partial<TOptions>

export type WatchResultCallback<TResult> = (result?: TResult) => void
