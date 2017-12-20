import { shallow } from 'enzyme'
import React from 'react'

import Navigation from './Navigation'

describe('<Navigation/>', () => {
  const makeWrapper = (props = {}) =>
    shallow(
      <Navigation
        actions={{ logoutUser: jest.fn() }}
        currentUser={{ isAuthenticated: true, user: {} }}
        {...props}
      />,
    )

  it('shows user nav when logged in', () => {
    const wrapper = makeWrapper()
    expect(wrapper.find('NavbarUser')).toHaveLength(1)
  })

  it("doesn't show user nav when logged out", () => {
    const wrapper = makeWrapper({
      currentUser: { isAuthenticated: false, user: {} },
    })
    expect(wrapper.find('NavbarUser')).toHaveLength(0)
  })

  it('triggers logout action', () => {
    const logoutUser = jest.fn()
    const wrapper = makeWrapper({ actions: { logoutUser } })
    wrapper
      .find('NavbarUser')
      .dive()
      .find('.logout')
      .simulate('click')
    expect(logoutUser).toHaveBeenCalled()
  })
})
