// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import '@testing-library/cypress/add-commands'
import 'cypress-real-events/support'
import { configure } from '@testing-library/cypress'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand({
  customSnapshotsDir: 'snapshots',
})
configure({ testIdAttribute: 'data-test-id' })

/**
 * Simulates a paste event.
 * Modified from https://gist.github.com/nickytonline/bcdef8ef00211b0faf7c7c0e7777aaf6
 *
 * @param subject A jQuery context representing a DOM element.
 * @param pasteOptions Set of options for a simulated paste event.
 * @param pasteOptions.pastePayload Simulated data that is on the clipboard.
 * @param pasteOptions.pasteFormat The format of the simulated paste payload. Default value is 'text'.
 * @param pasteOptions.files A list of assisiated file, if any
 *
 * @returns The subject parameter.
 *
 * @example
 * cy.get('body').paste({
 *   pasteType: 'application/json',
 *   pastePayload: {hello: 'yolo'},
 * });
 */
Cypress.Commands.add(
  'paste',
  { prevSubject: true },
  function onPaste(subject, pasteOptions) {
    const { pastePayload = '', pasteType = 'text', files = [] } = pasteOptions
    const data =
      pasteType === 'application/json'
        ? JSON.stringify(pastePayload)
        : pastePayload
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
    const clipboardData = new DataTransfer()
    clipboardData.setData(pasteType, data)
    files.forEach((file) => {
      clipboardData.items.add(file)
    })
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      dataType: pasteType,
      data,
      clipboardData,
    })
    subject[0].dispatchEvent(pasteEvent)

    return subject
  },
)

Cypress.Commands.add(
  'selectText',
  { prevSubject: true },
  (subject, direction, size) => {
    return cy
      .wrap(subject)
      .realPress([
        'Shift',
        ...new Array(size).fill(
          direction === 'right' ? 'ArrowRight' : 'ArrowLeft',
        ),
      ])
  },
)

Cypress.Commands.overwrite('screenshot', (original, ...args) => {
  const root = document.querySelector('body')

  root.style.setProperty('font-family', 'Helvetica')
  const result = original(...args)
  result.then(() => {
    root.style.removeProperty('font-family')
  })
  return result
})
