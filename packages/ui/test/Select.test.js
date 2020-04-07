import React from 'react'
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
          <Select options={options} />
        </TestThemeProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
