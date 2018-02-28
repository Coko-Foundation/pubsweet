import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import YesOrNo from '../src/molecules/YesOrNo'
import RadioGroup from '../src/molecules/RadioGroup'
import TestThemeProvider from './setup/theme'

const props = {
  name: 'TestName',
  value: 'Maybe',
}

const wrapper = shallow(<YesOrNo {...props} />)
const radio = wrapper.find(RadioGroup)

describe('Yes or No', () => {
  test('is rendered correclty', () => {
    const tree = renderer
      .create(
        <TestThemeProvider>
          <YesOrNo {...props} />
        </TestThemeProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Renders a RadioGroup', () => {
    expect(wrapper.is('RadioGroup')).toBeTruthy()
    expect(radio).toHaveLength(1)
  })

  test('Passes the correct options', () => {
    const { options } = radio.props()
    expect(options).toHaveLength(2)

    expect(options[0].value).toEqual('yes')
    expect(options[0].label).toEqual('Yes')

    expect(options[1].value).toEqual('no')
    expect(options[1].label).toEqual('No')
  })

  test('Passes down the correct name', () => {
    const { name } = radio.props()
    expect(name).toEqual(props.name)
  })

  test('Passes down the correct value', () => {
    const { value } = radio.props()
    expect(value).toEqual(props.value)
  })
})
