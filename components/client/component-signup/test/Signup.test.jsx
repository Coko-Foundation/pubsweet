import { shallow } from 'enzyme'
import React from 'react'
import { Field } from 'formik'
import { Button, ErrorText } from '@pubsweet/ui'

import Signup from '../src/Signup'

describe('<Signup />', () => {
  const makeWrapper = (props = {}) => shallow(<Signup {...props} />)

  it('renders the login form', () => {
    const wrapper = makeWrapper()
    expect(wrapper.debug()).toMatchSnapshot()
    expect(wrapper.find(Field)).toHaveLength(3)
    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find({ to: '/login' })).toHaveLength(1)
  })

  it('shows error', () => {
    const wrapper = makeWrapper({ status: { error: 'Yikes!' } })
    expect(wrapper.find(ErrorText)).toHaveLength(1)
  })

  it('can hide logo', () => {
    const logo = 'data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////'
    const wrapper1 = makeWrapper({ logo })
    const wrapper2 = makeWrapper()
    expect(wrapper1.find('Logo')).toHaveLength(1)
    expect(wrapper2.find('Logo')).toHaveLength(0)
  })

  it('triggers submit handler', () => {
    const handleSubmit = jest.fn()
    const wrapper = makeWrapper({ handleSubmit })
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalled()
  })
})
