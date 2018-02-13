import React from 'react'
import { shallow } from 'enzyme'
import Authsome from 'authsome'

import withAuthsome from '../../src/helpers/withAuthsome'

jest.mock('fake-mode', () => false, { virtual: true })

describe('withAuthsome higher order component', () => {
  it('injects authsome instance as prop', () => {
    const Component = withAuthsome()(() => null)
    const wrapper = shallow(<Component />, { context: { client: {} } }).dive()

    const authsome = wrapper.prop('authsome')
    expect(authsome).toBeInstanceOf(Authsome)
  })

  it('proxies requests to Apollo client', () => {
    const Component = withAuthsome()(() => null)
    const readFragment = jest.fn()
    const wrapper = shallow(<Component />, {
      context: { client: { readFragment } },
    }).dive()

    const { context } = wrapper.prop('authsome')
    context.models.User.find(1)
    expect(readFragment).toHaveBeenCalled()
  })
})
