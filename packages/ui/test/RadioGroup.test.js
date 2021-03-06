import React from 'react'
import { clone } from 'lodash'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Radio from '../src/atoms/Radio'
import RadioGroup from '../src/molecules/RadioGroup'
import TestThemeProvider from './setup/theme'

const props = {
  name: 'TestName',
  options: [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
    {
      label: 'Maybe',
      value: 'maybe',
    },
  ],
  required: true,
  value: undefined,
}

const wrapper = shallow(<RadioGroup {...props} />)
const radios = wrapper.find(Radio)

describe('Radio Group', () => {
  test('is rendered correctly', () => {
    const tree = renderer
      .create(
        <TestThemeProvider>
          <RadioGroup {...props} />
        </TestThemeProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Renders a number of radio buttons', () => {
    const len = props.options.length
    expect(wrapper.children()).toHaveLength(len)

    let i = 0

    while (i < len) {
      const child = wrapper.childAt(i)
      expect(child.is(Radio)).toBeTruthy()

      i += 1
    }

    expect(radios).toHaveLength(len)
  })

  test('Radios get the correct props', () => {
    const radioComps = radios.getElements()
    let i = 0

    while (i < props.options.length) {
      const radio = radioComps[i]
      const radioProps = radio.props

      expect(radioProps.label).toEqual(props.options[i].label)
      expect(radioProps.value).toEqual(props.options[i].value)
      expect(radioProps.name).toEqual(props.name)
      expect(radioProps.required).toEqual(props.required)

      i += 1
    }
  })

  test('Value should match the checked radio button', () => {
    // With no radio button selected
    const radioComps = radios.getElements()
    let i = 0

    while (i < props.options.length) {
      const radio = radioComps[i]
      const radioProps = radio.props

      expect(radioProps.checked).toBeFalsy()
      i += 1
    }

    // With the first radio button selected
    // (re-initialise the wrapper with changed props)
    const newProps = clone(props)
    newProps.value = 'yes'

    const newWrapper = shallow(<RadioGroup {...newProps} />)
    const newRadios = newWrapper.find(Radio)
    const newRadioComps = newRadios.getElements()

    i = 0

    while (i < props.options.length) {
      const radio = newRadioComps[i]
      const radioProps = radio.props

      if (i === 0) {
        expect(radioProps.checked).toBeTruthy()
      } else {
        expect(radioProps.checked).toBeFalsy()
      }

      i += 1
    }
  })
})
