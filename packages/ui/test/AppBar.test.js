import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import AppBar from '../src/molecules/AppBar'
import TestThemeProvider from './setup/theme'

const baseProps = {
  brand: 'some brand',
  onLogoutClick: () => {},
}

const render = (props = {}) =>
  renderer
    .create(
      <MemoryRouter>
        <TestThemeProvider>
          <AppBar {...props} {...baseProps} />
        </TestThemeProvider>
      </MemoryRouter>,
    )
    .toJSON()

describe('AppBar', () => {
  test('Basic display', () => {
    const tree = render()
    expect(tree).toMatchSnapshot()
  })

  test('With admin user', () => {
    const tree = render({ user: { username: 'some user', admin: true } })
    expect(tree).toMatchSnapshot()
  })

  test('With nav links', () => {
    const tree = render({ navLinks: <div>Links!</div> })
    expect(tree).toMatchSnapshot()
  })

  test('With custom brand and login links', () => {
    const tree = render({ brandLink: '/home', loginLink: '/signin' })
    expect(tree).toMatchSnapshot()
  })
})
