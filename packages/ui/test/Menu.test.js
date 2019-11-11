import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { Menu } from '../src/'
import TestThemeProvider from './setup/theme'

const props = {
  options: [
    { label: 'Foo', value: 'foo' },
    { label: 'Bar', value: 'bar' },
  ],
  value: 'foo',
}

const render = props =>
  renderer.create(
    <TestThemeProvider>
      <Menu {...props} />
    </TestThemeProvider>,
  )

describe('Menu', () => {
  test('is rendered correctly', () => {
    const tree = render(props).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('is rendered correctly when open', () => {
    const menu = render(props)
    menu.root.findByType(Menu).instance.toggleMenu()
    const tree = menu.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
