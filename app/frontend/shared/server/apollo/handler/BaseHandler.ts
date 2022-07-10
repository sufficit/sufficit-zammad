// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { Ref } from 'vue'
import { ApolloError, OperationVariables } from '@apollo/client/core'
import {
  BaseHandlerOptions,
  CommonHandlerOptions,
  CommonHandlerOptionsParameter,
  OperationResult,
  OperationReturn,
} from '@shared/types/server/apollo/handler'
import {
  GraphQLErrorReport,
  GraphQLErrorTypes,
  GraphQLHandlerError,
} from '@shared/types/error'
import {
  useNotifications,
  NotificationTypes,
} from '@shared/components/CommonNotifications'

export default abstract class BaseHandler<
  TResult = OperationResult,
  TVariables = OperationVariables,
  TOperationReturn extends OperationReturn<
    TResult,
    TVariables
  > = OperationReturn<TResult, TVariables>,
  THandlerOptions = BaseHandlerOptions,
> {
  public operationResult!: TOperationReturn

  protected baseHandlerOptions: BaseHandlerOptions = {
    errorShowNotification: true,
    errorNotificationMessage: __(
      'An error occured during the operation. Please contact your administrator.',
    ),
    errorNotificationType: NotificationTypes.Error,
  }

  public handlerOptions!: CommonHandlerOptions<THandlerOptions>

  constructor(
    operationResult: TOperationReturn,
    handlerOptions?: CommonHandlerOptionsParameter<THandlerOptions>,
  ) {
    this.operationResult = operationResult

    this.handlerOptions = this.mergedHandlerOptions(handlerOptions)

    this.initialize()
  }

  protected initialize(): void {
    this.operationResult.onError((error) => {
      this.handleError(error)
    })
  }

  public loading(): Ref<boolean> {
    return this.operationResult.loading
  }

  public operationError(): Ref<Maybe<ApolloError>> {
    return this.operationResult.error
  }

  protected handleError(error: ApolloError): void {
    const options = this.handlerOptions

    if (options.errorShowNotification) {
      useNotifications().notify({
        message: options.errorNotificationMessage,
        type: options.errorNotificationType,
      })
    }

    if (options.errorCallback) {
      const { graphQLErrors, networkError } = error
      let errorHandler: GraphQLHandlerError

      if (graphQLErrors.length > 0) {
        const { message, extensions }: GraphQLErrorReport = graphQLErrors[0]
        errorHandler = {
          type:
            (extensions?.type as GraphQLErrorTypes) ||
            GraphQLErrorTypes.NetworkError,
          message,
        }
      } else if (networkError) {
        errorHandler = {
          type: GraphQLErrorTypes.NetworkError,
        }
      } else {
        errorHandler = {
          type: GraphQLErrorTypes.UnkownError,
        }
      }
      options.errorCallback(errorHandler)
    }
  }

  protected mergedHandlerOptions(
    handlerOptions?: CommonHandlerOptionsParameter<THandlerOptions>,
  ): CommonHandlerOptions<THandlerOptions> {
    // The merged type is always safe as a 'CommonHandlerOptions<THandlerOptions>' type.
    return Object.assign(
      this.baseHandlerOptions,
      handlerOptions,
    ) as CommonHandlerOptions<THandlerOptions>
  }
}
