import {shallow} from 'enzyme'
import React from 'react'

import FormGroup from './FormGroup'

// otherwise you end up with two different Jois and it goes wrong
jest.mock('joi-browser', () => require('joi'))

describe('<FormGroup/>', () => {
  const makeWrapper = (props = {}) => shallow(<FormGroup
      controlId={''}
      label="Testing"
      modelProperty="fragment.title"
      {...props}
  />)

  it('shows error on invalid input', () => {
    const wrapper = makeWrapper({})
    wrapper.find('FormControl').simulate('change', {target: {value: 123}})
    expect(wrapper.state()).toMatchObject({
      startedEditing: true,
      validation: 'error'
    })
    expect(wrapper.html()).toContain('must be a string')
  })

  it('no error good input', () => {
    const wrapper = makeWrapper({})
    wrapper.find('FormControl').simulate('change', {target: {value: 'something'}})
    expect(wrapper.state()).toMatchObject({
      startedEditing: true,
      validation: 'success'
    })
    expect(wrapper.html()).not.toContain('must be a string')
  })
})
