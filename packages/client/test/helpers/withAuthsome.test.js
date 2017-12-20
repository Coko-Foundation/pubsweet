import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import Authsome from 'authsome'

import withAuthsome from '../../src/helpers/withAuthsome'

jest.mock('fake-mode', () => false, { virtual: true })

describe('withAuthsome higher order component', () => {
  const createStore = configureStore()

  it('injects authsome instance as prop', () => {
    const store = createStore()
    const Component = withAuthsome()(() => null)
    const wrapper = shallow(<Component store={store} />)

    const authsome = wrapper.prop('authsome')
    expect(authsome).toBeInstanceOf(Authsome)
  })

  it('reads values from store', () => {
    const user1 = { id: 1, admin: true }
    const user2 = { id: 2 }
    const store = createStore({
      users: {
        users: [user1, user2],
      },
    })
    const Component = withAuthsome()(() => null)
    const wrapper = shallow(<Component store={store} />)

    const { context } = wrapper.prop('authsome')
    expect(context.models.User.find(1)).toEqual(user1)
    expect(context.models.User.find(2)).toEqual(user2)
    expect(context.models.User.find(3)).toBeUndefined()
  })
})
