import {mount} from 'enzyme'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Login from './Login'

jest.mock('config', () => ({
  'pubsweet-client': {
    'login-redirect': 'foo/bar'
  }
}))

describe('<Login/>', () => {
  const makeWrapper = (props = {}) => mount(
      <BrowserRouter>
        <Login location={{query: {}}} {...props}/>
      </BrowserRouter>
  )

  it('shows error', () => {
    const wrapper = makeWrapper({error: 'Yikes!'})
    expect(wrapper.html()).toContain('Yikes!')
  })

  it('triggers login action', () => {
    const loginUser = jest.fn()
    const wrapper = makeWrapper({actions: {loginUser}})
    wrapper.find('button').simulate('click', {preventDefault: jest.fn()})
    expect(loginUser).toHaveBeenCalledWith({username: '', password: ''}, 'foo/bar')
  })
})
