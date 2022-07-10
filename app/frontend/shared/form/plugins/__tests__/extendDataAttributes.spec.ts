// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import {
  createNode,
  FormKitExtendableSchemaRoot,
  FormKitFrameworkContext,
} from '@formkit/core'
import { FormKit } from '@formkit/vue'
import { renderComponent } from '@tests/support/components'
import extendDataAttribues from '../global/extendDataAttributes'

const wrapperParameters = {
  form: true,
  formField: true,
}

const renderKit = (props: any = {}) => {
  const kit = renderComponent(FormKit, {
    ...wrapperParameters,
    props: {
      name: 'text',
      type: 'text',
      id: 'text',
      label: 'text',
      ...props,
    },
  })
  return {
    ...kit,
    getOuterKit: () => kit.container.querySelector('.formkit-outer'),
  }
}

describe('extendDataAttributes - data-populated', () => {
  describe('renders on output', () => {
    const originalSchema = vi.fn()
    const inputNode = createNode({
      type: 'input',
      value: 'Test node',
      props: {
        definition: { type: 'input', schema: originalSchema },
      },
    })

    inputNode.context = {
      fns: {},
    } as FormKitFrameworkContext

    beforeEach(() => {
      originalSchema.mockReset()
    })

    test('applies schema on input', () => {
      extendDataAttribues(inputNode)

      const schema = (inputNode.props.definition?.schema ||
        (() => ({}))) as FormKitExtendableSchemaRoot

      schema({})

      expect(originalSchema.mock.calls[0][0]).toHaveProperty(
        'outer.attrs.data-populated',
      )
    })

    test('skips non-inputs', () => {
      extendDataAttribues({
        ...inputNode,
        type: 'list',
      })

      expect(originalSchema).not.toHaveBeenCalled()
    })
  })

  describe('check output', () => {
    it('adds value populate data attribute', () => {
      const kit = renderKit()
      expect(kit.getOuterKit()).not.toHaveAttribute('data-populated')
    })

    it('is data attribute true when input has a value', async () => {
      const kit = renderKit()

      const input = kit.getByLabelText('text')
      await kit.events.clear(input)
      await kit.events.type(input, 'input')

      expect(kit.getOuterKit()).toHaveAttribute('data-populated')
    })
  })
})

describe('extendDataAttributes - data-required', () => {
  it('has data-required if field is required', () => {
    const kit = renderKit({
      required: true,
    })
    expect(kit.getOuterKit()).toHaveAttribute('data-required')
  })
})
