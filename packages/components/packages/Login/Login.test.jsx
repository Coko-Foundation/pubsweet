import { shallow } from 'enzyme'
import React from 'react'

import { Login, ErrorMessage, Signup, ResetPassword } from './Login'

describe('<Login/>', () => {
  const makeWrapper = (props = {}) => shallow(<Login {...props} />)

  it('shows error', () => {
    const wrapper = makeWrapper({ error: 'Yikes!' })
    expect(wrapper.find(ErrorMessage)).toHaveLength(1)
  })

  it('can hide sign up link', () => {
    const wrapper1 = makeWrapper()
    const wrapper2 = makeWrapper({ signup: false })
    expect(wrapper1.find(Signup)).toHaveLength(1)
    expect(wrapper2.find(Signup)).toHaveLength(0)
  })

  it('can hide password reset link', () => {
    const wrapper1 = makeWrapper()
    const wrapper2 = makeWrapper({ passwordReset: false })
    expect(wrapper1.find(ResetPassword)).toHaveLength(1)
    expect(wrapper2.find(ResetPassword)).toHaveLength(0)
  })

  it('triggers submit handler', () => {
    const handleSubmit = jest.fn()
    const wrapper = makeWrapper({ handleSubmit })
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalled()
  })
})
