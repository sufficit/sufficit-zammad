// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

vi.spyOn(console, 'error').mockReturnValue()
vi.spyOn(console, 'warn').mockReturnValue()
vi.spyOn(console, 'info').mockReturnValue()
vi.spyOn(console, 'log').mockReturnValue()
vi.spyOn(console, 'trace').mockReturnValue()

import log from '../log'

describe('log', () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('logs with default log level', () => {
    log.error('error')
    log.warn('warn')
    log.info('info')
    log.debug('debug')
    log.trace('trace')
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenCalledTimes(1)
    // This verifies our custom default log level INFO
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledTimes(0)
    expect(console.trace).toHaveBeenCalledTimes(0)
    log.setLevel('trace')
    log.error('error')
    log.warn('warn')
    log.info('info')
    log.debug('debug')
    log.trace('trace')
    // It seems trace also calls error().
    expect(console.error).toHaveBeenCalledTimes(2)
    expect(console.warn).toHaveBeenCalledTimes(2)
    expect(console.info).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.trace).toHaveBeenCalledTimes(1)
  })
})
