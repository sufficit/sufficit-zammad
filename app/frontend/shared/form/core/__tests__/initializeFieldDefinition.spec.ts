// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import {
  text as inputTextDefinition,
  select as selectDefinition,
} from '@formkit/inputs'
import initializeFieldDefinition from '@shared/form/core/initializeFieldDefinition'
import { cloneDeep } from 'lodash-es'
import translateWrapperProps from '@shared/form/features/translateWrapperProps'

describe('initializeFieldDefinition', () => {
  it('check for added default props without already existing props', () => {
    const definition = cloneDeep(inputTextDefinition)
    initializeFieldDefinition(definition)

    expect(definition.props).toEqual(['formId', 'labelPlaceholder'])
  })

  it('check for added default props with existing props', () => {
    const definition = cloneDeep(selectDefinition)
    initializeFieldDefinition(definition)

    expect(definition.props).toEqual([
      ...(selectDefinition.props || []),
      'formId',
      'labelPlaceholder',
    ])
  })

  it('check for added default features without already existing features', () => {
    const definition = cloneDeep(inputTextDefinition)
    initializeFieldDefinition(definition)

    expect(definition.features).toEqual([translateWrapperProps])
  })

  it('check for added default features with existing features', () => {
    const definition = cloneDeep(selectDefinition)
    initializeFieldDefinition(definition)

    expect(definition.features).toEqual([
      translateWrapperProps,
      ...(selectDefinition.features || []),
    ])
  })

  it('do not add default props', () => {
    const definition = cloneDeep(inputTextDefinition)
    initializeFieldDefinition(definition, {}, false)

    expect(definition.props).toEqual([])
  })

  it('do not add default features', () => {
    const definition = cloneDeep(inputTextDefinition)
    initializeFieldDefinition(definition, {}, true, false)

    expect(definition.features).toEqual([])
  })

  it('add additional props and features', () => {
    const featureExample = vi.fn()

    const definition = cloneDeep(inputTextDefinition)
    initializeFieldDefinition(definition, {
      props: ['example'],
      features: [featureExample],
    })

    expect(definition.props).toEqual(['formId', 'labelPlaceholder', 'example'])
    expect(definition.features).toEqual([translateWrapperProps, featureExample])
  })
})
