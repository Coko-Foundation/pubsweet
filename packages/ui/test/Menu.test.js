import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Menu from '../src/atoms/Menu'

const props = {
  options: [{ label: 'Foo', value: 'foo' }, { label: 'Bar', value: 'bar' }],
  value: 'foo',
}

describe('Menu', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<Menu {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('is rendered correctly when open', () => {
    const menu = renderer.create(<Menu {...props} />)
    menu.getInstance().toggleMenu()
    const tree = menu.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
