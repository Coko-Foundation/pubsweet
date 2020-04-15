import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import TestThemeProvider from './setup/theme'

import { Select } from '../src'

describe('Select', () => {
  const options = [
    { value: 'first', label: 'First' },
    { value: 'second', label: 'Second' },
    { value: 'third', label: 'Third' },
    { value: 'fourth', label: 'Fourth' },
  ]
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <TestThemeProvider>
          <Select isClearable options={options} />
        </TestThemeProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('should render my component', () => {
    const wrapper = shallow(
      <TestThemeProvider>
        <Select
          onChange={event => {
            this.setState({ input: event.target.value })
          }}
          options={options}
        />
      </TestThemeProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
