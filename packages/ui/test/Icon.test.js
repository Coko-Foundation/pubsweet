import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import 'jest-styled-components'

import { Icon } from '../src/'

const render = (name, props = { theme: { a: 1 } }) =>
  renderer.create(
    <ThemeProvider theme={props.theme}>
      <Icon>{name}</Icon>
    </ThemeProvider>,
  )
describe('Icon', () => {
  test('is rendered correctly', () => {
    const tree = render('circle').toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('is rendered correctly with override', () => {
    const CircleOverride = () => <circle-override />
    const tree = render('circle', {
      theme: { icons: { Circle: CircleOverride } },
    }).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
