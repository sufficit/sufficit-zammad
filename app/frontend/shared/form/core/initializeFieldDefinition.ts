// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import type { FormKitTypeDefinition } from '@formkit/core'
import { mergeArray } from '@shared/utils/helpers'
import defaulfFieldDefinition from './defaultFieldDefinition'

const initializeFieldDefinition = (
  definition: FormKitTypeDefinition,
  additionalDefinitionOptions: Pick<
    FormKitTypeDefinition,
    'props' | 'features'
  > = {},
  addDefaultProps = true,
  addDefaultFeatures = true,
) => {
  const localDefinition = definition
  localDefinition.props ||= []
  localDefinition.features ||= []

  const additionalProps = additionalDefinitionOptions.props || []
  if (addDefaultProps) {
    localDefinition.props = mergeArray(
      localDefinition.props,
      defaulfFieldDefinition.props.concat(additionalProps),
    )
  }

  const additionalFeatures = additionalDefinitionOptions.features || []
  if (addDefaultFeatures) {
    localDefinition.features = mergeArray(
      defaulfFieldDefinition.features.concat(additionalFeatures),
      localDefinition.features,
    )
  }
}

export default initializeFieldDefinition
