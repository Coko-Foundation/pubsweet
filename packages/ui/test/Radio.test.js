import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Radio from '../src/atoms/Radio'

const props = {
  checked: false,
  label: 'TestLabel',
  name: 'TestName',
  required: true,
  value: 'TestValue',
}

const wrapper = mount(<Radio {...props} />)

describe('Radio', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<Radio {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Input gets the correct props', () => {
    const input = wrapper.find('input')

    expect(input.prop('name')).toBe(props.name)
    expect(input.prop('value')).toBe(props.value)
    expect(input.prop('checked')).toBe(props.checked)
    expect(input.prop('required')).toBe(props.required)
  })
})
