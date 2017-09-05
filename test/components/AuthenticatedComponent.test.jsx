global.PUBSWEET_COMPONENTS = []

import React from 'react'
import { shallow } from 'enzyme'

const { AuthenticatedComponent } = require('../../src/components/AuthenticatedComponent')

function makeWrapper (props = {}) {
  return shallow(<AuthenticatedComponent
    component={function ChildComponent () {}}
    selector={jest.fn(() => ({}))}
    operation=""
    authsome={{ mode: jest.fn(() => false) }}
    actions={{
      getCollections: () => Promise.resolve(),
      getCurrentUser: () => Promise.resolve()
    }}
    currentUser={{}}
    pushState={jest.fn()}
    location={{}}
    {...props} />)
}

describe('<AuthenticatedComponent/>', () => {
  it('does nothing when fetching', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState })
    wrapper.instance().checkAuth({ isFetching: true })

    expect(wrapper.type()).toBe(null)
    expect(pushState).not.toHaveBeenCalled()
  })

  it('redirects to login if not authenticated', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' } })
    wrapper.instance().checkAuth({ isAuthenticated: false })

    expect(wrapper.type()).toBe(null)
    expect(pushState).toHaveBeenCalledWith('/login?next=blah')
  })

  it('redirects to authsome fail URL if not authorized', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({
      pushState,
      authsome: {
        mode: jest.fn(() => false),
        'fail-redirect': 'stuff'
      }
    })
    wrapper.instance().checkAuth({ isAuthenticated: true })

    expect(wrapper.type()).toBe(null)
    expect(pushState).toHaveBeenCalledWith('stuff')
  })

  it('renders component if authorized', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({
      pushState,
      authsome: {
        mode: jest.fn(() => true),
        'fail-redirect': 'stuff'
      }
    })
    wrapper.instance().checkAuth({ isAuthenticated: true })

    expect(wrapper.name()).toBe('ChildComponent')
    expect(pushState).not.toHaveBeenCalled()
  })

  it('calls checkAuth() when props change', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' } })
    wrapper.setProps({currentUser: { isAuthenticated: false }})

    expect(pushState).toHaveBeenCalledWith('/login?next=blah')
  })
})
