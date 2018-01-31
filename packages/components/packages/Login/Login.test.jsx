import { shallow } from 'enzyme'
import React from 'react'

import Login from './Login'

describe('<Login/>', () => {
  const makeWrapper = (props = {}) => shallow(<Login {...props} />)

  it('shows error', () => {
    const wrapper = makeWrapper({ error: 'Yikes!' })
    expect(wrapper.text()).toContain('Yikes!')
  })

  it('can hide sign up link', () => {
    const wrapper1 = makeWrapper()
    const wrapper2 = makeWrapper({ signup: false })
    expect(wrapper1.text()).toContain("Don't have an account?")
    expect(wrapper2.text()).not.toContain("Don't have an account?")
  })

  it('can hide password reset link', () => {
    const wrapper1 = makeWrapper()
    const wrapper2 = makeWrapper({ passwordReset: false })
    expect(wrapper1.text()).toContain('Forgot your password?')
    expect(wrapper2.text()).not.toContain('Forgot your password?')
  })

  it('triggers submit handler', () => {
    const handleSubmit = jest.fn()
    const wrapper = makeWrapper({ handleSubmit })
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalled()
  })
})
