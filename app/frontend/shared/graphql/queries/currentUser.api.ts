import * as Types from '../types';

import gql from 'graphql-tag';
import { ObjectAttributeValuesFragmentDoc } from '../fragments/objectAttributeValues.api';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    firstname
    lastname
    preferences
    objectAttributeValues {
      ...objectAttributeValues
    }
    organization {
      name
      objectAttributeValues {
        ...objectAttributeValues
      }
    }
    permissions {
      names
    }
  }
}
    ${ObjectAttributeValuesFragmentDoc}`;
export function useCurrentUserQuery(options: VueApolloComposable.UseQueryOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>(CurrentUserDocument, {}, options);
}
export function useCurrentUserLazyQuery(options: VueApolloComposable.UseQueryOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>(CurrentUserDocument, {}, options);
}
export type CurrentUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>;