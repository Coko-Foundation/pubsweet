global.PUBSWEET_COMPONENTS = []

import React from 'react'
import { shallow } from 'enzyme'

import { Authorize } from '../../src/helpers/Authorize'

function makeWrapper (props = {}) {
  return shallow(<Authorize {...props}>
    <div/>
  </Authorize>)
}

describe('<Authorize/>', () => {
  it('is empty when not authorized', () => {
    const mode = jest.fn(() => false)
    const wrapper = makeWrapper({ authsome: { mode } })

    expect(mode).toHaveBeenCalled()
    expect(wrapper.type()).toBe(null)
  })

  it('is empty when authsome throws', () => {
    const mode = jest.fn(() => { throw new Error('Yikes!') })
    const wrapper = makeWrapper({ authsome: { mode } })

    expect(mode).toHaveBeenCalled()
    expect(wrapper.type()).toBe(null)
  })

  it('renders children when authorized', () => {
    const mode = jest.fn(() => true)
    const wrapper = makeWrapper({ authsome: { mode } })

    expect(mode).toHaveBeenCalled()
    expect(wrapper.type()).toBe('div')
  })
})
