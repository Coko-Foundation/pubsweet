import React from 'react'
import { clone } from 'lodash'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Checkbox from '../src/atoms/Checkbox'
import CheckboxGroup from '../src/molecules/CheckboxGroup'

const props = {
  options: [
    {
      label: 'One',
      value: 'one',
    },
    {
      label: 'Two',
      value: 'two',
    },
    {
      label: 'Three',
      value: 'three',
    },
  ],
}

const wrapper = shallow(<CheckboxGroup {...props} />)
const Checkboxes = wrapper.find(Checkbox)

describe('Checkbox Group', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<CheckboxGroup {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Renders a number of Checkbox buttons', () => {
    const len = props.options.length
    expect(wrapper.children()).toHaveLength(len)

    let i = 0

    while (i < len) {
      const child = wrapper.childAt(i)
      expect(child.is(Checkbox)).toBeTruthy()

      i += 1
    }

    expect(Checkboxes).toHaveLength(len)
  })

  test('Checkboxes get the correct props', () => {
    const CheckboxComps = Checkboxes.getElements()
    let i = 0

    while (i < props.options.length) {
      const Checkbox = CheckboxComps[i]
      const CheckboxProps = Checkbox.props

      expect(CheckboxProps.label).toEqual(props.options[i].label)
      expect(CheckboxProps.value).toEqual(props.options[i].value)
      expect(CheckboxProps.name).toEqual(props.name)
      expect(CheckboxProps.required).toEqual(props.required)

      i += 1
    }
  })

  test('Value should match the checked Checkbox button', () => {
    // With no Checkbox selected
    const CheckboxComps = Checkboxes.getElements()
    let i = 0

    while (i < props.options.length) {
      const Checkbox = CheckboxComps[i]
      const CheckboxProps = Checkbox.props

      expect(CheckboxProps.checked).toBeFalsy()
      i += 1
    }

    // With the first Checkbox selected
    // (re-initialise the wrapper with changed props)
    const newProps = clone(props)
    newProps.value = ['one', 'three']

    const newWrapper = shallow(<CheckboxGroup {...newProps} />)
    const newCheckboxes = newWrapper.find(Checkbox)
    const newCheckboxComps = newCheckboxes.getElements()

    i = 0

    while (i < props.options.length) {
      const Checkbox = newCheckboxComps[i]
      const CheckboxProps = Checkbox.props

      if (i === 0 || i === 2) {
        expect(CheckboxProps.checked).toBeTruthy()
      } else {
        expect(CheckboxProps.checked).toBeFalsy()
      }

      i += 1
    }
  })

  test('onChange should be called and with correct values', () => {
    const newProps = clone(props)
    newProps.value = ['three']
    newProps.onChange = jest.fn()
    const newWrapper = shallow(<CheckboxGroup {...newProps} />)
    const checkboxTwo = newWrapper.find('Checkbox').at(1)
    checkboxTwo.simulate('change', {
      target: {
        value: 'two',
        checked: true,
      },
    })

    expect(newProps.onChange).toHaveBeenCalledWith(['three', 'two'])

    // Values in props should be the same after selection (no direct mutation)
    expect(newProps.value).toEqual(['three'])
  })
})
