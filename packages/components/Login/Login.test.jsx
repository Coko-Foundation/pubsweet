import { shallow } from 'enzyme'
import React from 'react'
import { Field } from 'formik'
import { Button, Link, ErrorText } from '@pubsweet/ui'

import Login from './Login'

describe('<Login/>', () => {
  const makeWrapper = (props = {}) => shallow(<Login {...props} />)

  it('renders the login form', () => {
    const wrapper = makeWrapper()

    expect(wrapper.find(Field)).toHaveLength(2)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find(Link)).toHaveLength(2)
  })

  it('shows error', () => {
    const wrapper = makeWrapper({ errors: 'Yikes!' })
    expect(wrapper.find(ErrorText)).toHaveLength(1)
  })

  it('can hide logo', () => {
    const logo = 'data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////'
    const wrapper1 = makeWrapper({ logo })
    const wrapper2 = makeWrapper({ logo: null })
    expect(wrapper1.find('Logo')).toHaveLength(1)
    expect(wrapper2.find('Logo')).toHaveLength(0)
  })

  it('can hide sign up link', () => {
    const wrapper1 = makeWrapper()
    const wrapper2 = makeWrapper({ signup: false })
    expect(wrapper1.find({ to: '/signup' })).toHaveLength(1)
    expect(wrapper2.find({ to: '/signup' })).toHaveLength(0)
  })

  it('can hide password reset link', () => {
    const wrapper1 = makeWrapper()
    const wrapper2 = makeWrapper({ passwordReset: false })
    expect(wrapper1.find({ to: '/password-reset' })).toHaveLength(1)
    expect(wrapper2.find({ to: '/password-reset' })).toHaveLength(0)
  })

  it('triggers submit handler', () => {
    const handleSubmit = jest.fn()
    const wrapper = makeWrapper({ handleSubmit })
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalled()
  })
})
