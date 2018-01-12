import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

import AppBar from '../src/molecules/AppBar'

const baseProps = {
  brand: 'some brand',
  onLogoutClick: () => {},
}

describe('AppBar', () => {
  test('Basic display', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AppBar {...baseProps} />
        </MemoryRouter>,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('With admin user', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AppBar
            {...baseProps}
            user={{ username: 'some user', admin: true }}
          />
        </MemoryRouter>,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('With nav links', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AppBar {...baseProps} navLinks={<div>Links!</div>} />
        </MemoryRouter>,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('With custom brand and login links', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AppBar {...baseProps} brandLink="/home" loginLink="/signin" />
        </MemoryRouter>,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
