import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { IconButton } from '../src/'

describe('IconButton', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<IconButton icon="plus">Add</IconButton>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
