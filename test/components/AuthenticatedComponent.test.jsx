import React from 'react'
import { shallow } from 'enzyme'

global.PUBSWEET_COMPONENTS = []

const {
  AuthenticatedComponent,
} = require('../../src/components/AuthenticatedComponent')

function makeWrapper(props = {}) {
  return shallow(
    <AuthenticatedComponent
      getCurrentUser={() => Promise.resolve()}
      pushState={jest.fn()}
      location={{}}
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

    expect(wrapper.find('button').length).toBe(0)
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

  it('renders children components when authenticated', async () => {
    const pushState = jest.fn()
    const wrapper = makeWrapper({ pushState, location: { pathname: 'blah' }, isFetching: false, isAuthenticated: true })

    expect(wrapper.find('button').length).toBe(1)
  })
})
