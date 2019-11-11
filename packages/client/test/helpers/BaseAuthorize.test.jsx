import React from 'react'
import { shallow } from 'enzyme'
import { promisify } from 'util'

import { Authorize } from '../../src/helpers/Authorize'

const setImmediatePromise = promisify(setImmediate)

jest.mock('fake-mode', () => false, { virtual: true })

function makeWrapper(props = {}) {
  return shallow(
    <Authorize currentUser={{ id: 'user1' }} {...props}>
      <div />
    </Authorize>,
  )
}

describe('<Authorize/>', () => {
  let resolveMode
  let rejectMode
  let modePromise
  let mode
  let authsome

  beforeEach(() => {
    modePromise = new Promise((resolve, reject) => {
      resolveMode = resolve
      rejectMode = reject
    })
    mode = jest.fn(() => modePromise)
    authsome = { can: mode }
  })

  it('is empty when authsome throws', async () => {
    const wrapper = makeWrapper({
      authsome,
      client: { query: jest.fn(() => ({ data: {} })) },
    })
    jest.spyOn(global.console, 'error').mockImplementation(jest.fn())

    rejectMode(new Error('Authorize test error'))

    try {
      await modePromise
    } catch (err) {
      wrapper.update()
      expect(wrapper.type()).toBe(null)
      await setImmediatePromise()
      expect(console.error).toHaveBeenCalled()
    }

    expect.hasAssertions()
  })

  it('rechecks auth when props change', async () => {
    resolveMode(true)

    const wrapper = makeWrapper({
      authsome,
      client: {
        query: jest.fn(() => ({
          data: {},
        })),
      },
    })
    await setImmediatePromise()

    expect(mode).toHaveBeenCalled()
    mode.mockClear()

    wrapper.setProps({ authsome, currentUser: { id: 'user2' } })
    wrapper.update()

    await setImmediatePromise()
    expect(mode).toHaveBeenCalled()
  })
})
