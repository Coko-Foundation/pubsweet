import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import TestThemeProvider from './setup/theme'

import { SelectDropdown } from '../src'

const baseProps = {
  options: [
    { value: 'first', label: 'First' },
    { value: 'second', label: 'Second' },
    { value: 'third', label: 'Third' },
    { value: 'fourth', label: 'Fourth' },
  ],
  label: 'Select one option',
}
const render = (props = {}) =>
  renderer
    .create(
      <TestThemeProvider>
        <SelectDropdown {...props} {...baseProps} />
      </TestThemeProvider>,
    )
    .toJSON()

describe('SelectDropdown', () => {
  test('renders correctly', () => {
    const tree = render()
    expect(tree).toMatchSnapshot()
  })

  test('With costom dropdown indicator', () => {
    const tree = render({ icon: 'chevron_up' })
    expect(tree).toMatchSnapshot()
  })
})
