global.PUBSWEET_COMPONENTS = []

import React from 'react'
import { shallow } from 'enzyme'

const { AuthenticatedComponent } = require('../../src/components/AuthenticatedComponent')

function makeWrapper (props = {}) {
  return shallow(<AuthenticatedComponent
    object={{}}
    operation=""
    actions={{
      getCurrentUser: () => Promise.resolve()
    }}
    currentUser={{}}
    pushState={jest.fn()}
    location={{}}
    {...props}>
    <button/>
  </AuthenticatedComponent>)
}

describe('<AuthenticatedComponent/>', () => {
  it('does nothing when fetching', async () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState })
    wrapper.instance().checkAuth({ isFetching: true })

    expect(pushState).not.toHaveBeenCalled()
  })

  it('redirects to login if not authenticated', async () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' } })
    wrapper.instance().checkAuth({ isAuthenticated: false })

    expect(pushState).toHaveBeenCalledWith('/login?next=blah')
  })

  it('calls checkAuth() when props change', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' } })

    expect(pushState).not.toHaveBeenCalled()

    wrapper.setProps({ isAuthenticated: false })
    expect(pushState).toHaveBeenCalledWith('/login?next=blah')
  })
})
