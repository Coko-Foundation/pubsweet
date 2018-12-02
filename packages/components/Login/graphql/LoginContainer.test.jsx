import React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter, Route } from 'react-router-dom'

import wait from 'waait'
import { LOGIN_USER } from './mutations'
import LoginContainer from './LoginContainer'

const user1 = {
  id: 'user1',
  username: 'admin',
  password: 'adminadmin',
  admin: true,
  teams: [],
}

const mocks = currentUser => [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          username: currentUser.username,
          password: currentUser.password,
        },
      },
    },
    result: {
      data: {
        loginUser: {
          user: currentUser,
          token: 'greatToken',
        },
      },
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          username: currentUser.username,
          password: 'wrongPassword',
        },
      },
    },
    result: {
      data: { loginUser: null },
      errors: [{ message: 'Wrong username or password.' }],
    },
  },
]

let globalLocation

function makeDeepWrapper(currentUser, props = {}) {
  // A theme is needed because some components use colors
  // specified in the theme to render themselves (e.g. Link)
  const theme = {
    colorPrimary: '#fff',
    colorSecondary: '#fff',
  }

  return mount(
    <ThemeProvider theme={theme}>
      <MockedProvider addTypename={false} mocks={mocks(currentUser)}>
        <MemoryRouter initialEntries={['/login']}>
          <Route
            {...props}
            render={p => {
              globalLocation = p.location
              return <LoginContainer {...p} />
            }}
          />
        </MemoryRouter>
      </MockedProvider>
    </ThemeProvider>,
  )
}

describe('LoginContainer', () => {
  beforeEach(() => {
    window.localStorage.clear()
    globalLocation = undefined
  })

  it('renders the login form', () => {
    const wrapper = makeDeepWrapper(user1)
    wrapper.update()

    const fields = wrapper.find('Login')
    expect(fields).toHaveLength(1)
  })

  it('submits login information and logs the user in', async () => {
    const wrapper = makeDeepWrapper(user1)
    wrapper.update()

    const usernameField = wrapper.find('TextField[label="Username"] input')
    usernameField.getDOMNode().value = user1.username
    usernameField.simulate('change')
    const passwordField = wrapper.find('TextField[label="Password"] input')
    passwordField.getDOMNode().value = user1.password
    passwordField.simulate('change')

    wrapper.update()
    const button = wrapper.find('button')
    button.simulate('submit')

    wrapper.update()
    await wait(50)

    expect(window.localStorage.token).toEqual('greatToken')
    expect(globalLocation.pathname).toEqual('/testRedirect')
  })

  it('does not log in user with incorrect credentials', async () => {
    const wrapper = makeDeepWrapper(user1)
    wrapper.update()

    const usernameField = wrapper.find('TextField[label="Username"] input')
    usernameField.getDOMNode().value = user1.username
    usernameField.simulate('change')
    const passwordField = wrapper.find('TextField[label="Password"] input')
    passwordField.getDOMNode().value = 'wrongPassword'
    passwordField.simulate('change')

    wrapper.update()
    const button = wrapper.find('button')

    button.simulate('submit')

    wrapper.update()
    await wait(50)

    expect(wrapper.find('Login').text()).toContain(
      'Wrong username or password.',
    )
    expect(window.localStorage.token).toEqual(undefined)
    expect(globalLocation.pathname).toEqual('/login')
  })
})
