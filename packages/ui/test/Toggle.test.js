import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Toggle from '../src/atoms/Toggle'
import TestThemeProvider from './setup/theme'

const props = {
  value: false,
  disabled: false,
  label: 'Not Admin',
  labelChecked: 'Is admin',
}

describe('Toggle', () => {
  test('is rendered correctly', () => {
    const tree = renderer
      .create(
        <TestThemeProvider>
          <Toggle {...props} />
        </TestThemeProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
