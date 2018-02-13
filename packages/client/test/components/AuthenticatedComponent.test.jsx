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
      data={{}}
      history={{ push: jest.fn() }}
      location={{}}
      {...props}
    >
      <button />
    </AuthenticatedComponent>,
  )
}

describe('<AuthenticatedComponent/>', () => {
  it('does nothing when fetching', async () => {
    const wrapper = makeWrapper()
    wrapper.instance().checkAuth({ data: { loading: true } })

    expect(wrapper.find('button')).toHaveLength(0)
    const pushMock = wrapper.instance().props.history.push
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('redirects to login if not authenticated', async () => {
    const wrapper = makeWrapper({ location: { pathname: 'blah' } })
    wrapper.instance().checkAuth({ data: {} })

    const pushMock = wrapper.instance().props.history.push
    expect(pushMock).toHaveBeenCalledWith('/login?next=blah')
  })

  it('calls checkAuth() when props change', () => {
    const wrapper = makeWrapper({ location: { pathname: 'blah' } })

    const pushMock = wrapper.instance().props.history.push
    expect(pushMock).not.toHaveBeenCalled()

    wrapper.setProps({ data: {} })
    expect(pushMock).toHaveBeenCalledWith('/login?next=blah')
  })

  it('renders children components when authenticated', async () => {
    const wrapper = makeWrapper({
      location: { pathname: 'blah' },
      data: {
        loading: false,
        currentUser: { user: {} },
      },
    })

    expect(wrapper.find('button')).toHaveLength(1)
  })
})
