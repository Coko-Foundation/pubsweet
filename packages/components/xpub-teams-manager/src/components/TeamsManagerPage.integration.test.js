import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ThemeProvider } from 'styled-components'

import { reducers } from 'pubsweet-client'

import TeamsManagerPage from './TeamsManagerPage'

import TeamsManager from './TeamsManager'
import TeamCreator from './TeamCreator'

// this should be elsewhere
Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => ({
  'pubsweet-client': {},
  authsome: {
    mode: 'authsome',
    teams: {
      seniorEditor: {
        name: 'Senior Editors',
        permissions: '',
      },
      handlingEditor: {
        name: 'Handling Editors',
        permissions: '',
      },
      managingEditor: {
        name: 'Managing Editors',
        permissions: '',
      },
      reviewer: {
        name: 'Reviewer',
        permissions: '',
      },
    },
  },
}))

// Mock out the API
jest.mock('pubsweet-client/src/helpers/api', () => ({
  get: jest.fn(url => {
    // Whatever the request is, return an empty array
    const response = []
    return new Promise(resolve => resolve(response))
  }),
}))

global.window.localStorage = {
  getItem: jest.fn(() => 'tok123'),
}

const reducer = combineReducers(reducers)

const middlewares = [thunk]
const mockStore = () =>
  configureMockStore(middlewares)(actions =>
    Object.assign(
      actions.reduce(reducer, {
        currentUser: { isAuthenticated: true },
      }),
      (actions.users || []).reduce(reducer, {
        users: {
          users: [
            { id: '1', username: 'author' },
            { id: '2', username: 'managing Editor' },
          ],
        },
      }),
    ),
  )

describe('TeamsManagerPage', () => {
  it('runs', done => {
    const store = mockStore()
    const page = mount(
      <MemoryRouter>
        <ThemeProvider
          theme={{
            colorPrimary: 'blue',
            colorSecondary: '#E7E7E7',
          }}
        >
          <Provider store={store}>
            <TeamsManagerPage />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>,
    )

    setImmediate(() => {
      page.update()
      expect(page.find(TeamsManager)).toHaveLength(1)
      expect(page.find(TeamCreator)).toHaveLength(1)
      done()
    })
  })
})
