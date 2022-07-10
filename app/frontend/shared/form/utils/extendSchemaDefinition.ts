// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { cloneDeep } from 'lodash-es'
import type {
  FormKitExtendableSchemaRoot,
  FormKitNode,
  FormKitSchemaCondition,
  FormKitSchemaNode,
} from '@formkit/core'
import { FormSchemaExtendType } from '@shared/types/form'

// Can later be switched to in built-in feature from FormKit (when it's available).
const extendSchemaDefinition = (
  node: FormKitNode,
  sectionKey: string,
  schemaExtension: FormKitSchemaCondition | Partial<FormKitSchemaNode>,
  extendType: FormSchemaExtendType = FormSchemaExtendType.Replace,
  cloneDefinition = true,
) => {
  const { props } = node

  if (!props.definition) return

  const definition = cloneDefinition
    ? cloneDeep(props.definition)
    : props.definition

  const originalSchema = definition.schema as FormKitExtendableSchemaRoot

  definition.schema = (extensions) => {
    let sectionSchemaExtension:
      | FormKitSchemaCondition
      | Partial<FormKitSchemaNode>

    if (extendType === FormSchemaExtendType.Replace) {
      sectionSchemaExtension = schemaExtension
    } else {
      const currentExtension = extensions[sectionKey]

      let currentChildren: Maybe<
        (FormKitSchemaCondition | Partial<FormKitSchemaNode>)[]
      > = null
      if (
        currentExtension &&
        typeof currentExtension === 'object' &&
        'children' in currentExtension &&
        Array.isArray(currentExtension.children)
      ) {
        currentChildren = currentExtension.children
      }

      if (currentChildren) {
        sectionSchemaExtension = {
          children:
            extendType === FormSchemaExtendType.Append
              ? [...currentChildren, schemaExtension]
              : [schemaExtension, ...currentChildren],
        } as Partial<FormKitSchemaNode>
      } else {
        sectionSchemaExtension = {
          children: [schemaExtension],
        } as Partial<FormKitSchemaNode>
      }
    }

    const localExtensions = {
      ...extensions,
      [sectionKey]: sectionSchemaExtension,
    }
    return originalSchema(localExtensions)
  }

  props.definition = definition
}

export default extendSchemaDefinition
