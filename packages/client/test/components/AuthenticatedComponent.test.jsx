import React from 'react'
import { shallow } from 'enzyme'

global.PUBSWEET_COMPONENTS = []

jest.mock('fake-mode', () => false, { virtual: true })
const {
  AuthenticatedComponent,
} = require('../../src/components/AuthenticatedComponent')

function makeWrapper(props = {}) {
  return shallow(
    <AuthenticatedComponent
      ensureCurrentUser={() => Promise.resolve()}
      location={{}}
      pushState={jest.fn()}
      {...props}
    >
      <button />
    </AuthenticatedComponent>,
  )
}

describe('<AuthenticatedComponent/>', () => {
  it('does nothing when fetching', async () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState })
    wrapper.instance().checkAuth({ isFetching: true })

    expect(wrapper.find('button')).toHaveLength(0)
    expect(pushState).not.toHaveBeenCalled()
  })

  it('redirects to login if not authenticated', async () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' } })
    wrapper.instance().checkAuth({ isAuthenticated: false })

    expect(pushState).toHaveBeenCalledWith('/login?next=blah', {
      from: { pathname: 'blah' },
    })
  })

  it('calls checkAuth() when props change', () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' } })

    expect(pushState).not.toHaveBeenCalled()

    wrapper.setProps({ isAuthenticated: false })
    expect(pushState).toHaveBeenCalledWith('/login?next=blah', {
      from: { pathname: 'blah' },
    })
  })

  it('renders children components when authenticated', async () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({
      pushState,
      location: { pathname: 'blah' },
      isFetching: false,
      isAuthenticated: true,
    })

    expect(wrapper.find('button')).toHaveLength(1)
  })
})
