import React from 'react'
import { shallow } from 'enzyme'
import { Authorize } from '../../src/helpers/Authorize'

global.PUBSWEET_COMPONENTS = []

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

  it('is empty when not authorized', async () => {
    const wrapper = makeWrapper({ authsome })

    // mode is called synchronously but returns asynchronously
    expect(mode).toHaveBeenCalled()

    resolveMode(false)

    // wait for mode promise to resolve before asserting on content
    await modePromise

    expect(wrapper.type()).toBe(null)
  })

  it('optionally shows alternative content when not authorized', async () => {
    const wrapper = makeWrapper({ authsome, unauthorized: <span /> })

    resolveMode(false)
    await modePromise
    expect(wrapper.type()).toBe('span')
  })

  it('is empty when authsome throws', async () => {
    const wrapper = makeWrapper({ authsome })
    jest.spyOn(console, 'error').mockImplementation(jest.fn())

    rejectMode(new Error('Authorize test error'))

    try {
      await modePromise
    } catch (err) {
      expect(wrapper.type()).toBe(null)
      expect(console.error).toHaveBeenCalled()
    }

    expect.hasAssertions()
  })

  it('renders children when authorized', async () => {
    const wrapper = makeWrapper({ authsome })

    resolveMode(true)
    await modePromise
    expect(wrapper.type()).toBe('div')
  })

  it('rechecks auth when props change', () => {
    const wrapper = makeWrapper({ authsome })

    expect(mode).toHaveBeenCalled()
    mode.mockClear()

    wrapper.setProps({ authsome, currentUser: { id: 'user2' } })
    expect(mode).toHaveBeenCalled()
  })
})
