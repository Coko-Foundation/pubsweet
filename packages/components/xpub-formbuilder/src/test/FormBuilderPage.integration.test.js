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

import FormBuilderPage from '../components/FormBuilderPage'

import forms from './config/test.json'

import FormProperties from '../components/FormProperties'

// this should be elsewhere
Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => {
  const path = require('path')

  return {
    'pubsweet-client': {},
    'pubsweet-component-xpub-formbuilder': {
      path: path.resolve('../test/config'),
    },
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
  }
})

// Mock out the API
jest.mock('pubsweet-client/src/helpers/api', () => ({
  get: jest.fn(url => {
    // Whatever the request is, return an empty array
    const response = []
    return new Promise(resolve => resolve(response))
  }),
}))

jest.mock('pubsweet-client/src/helpers/Authorize', () => 'Authorize')

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
      { forms: { forms: { forms } } },
    ),
  )

describe('FormBuilderPage', () => {
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
            <FormBuilderPage />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>,
    )

    setImmediate(() => {
      page.update()
      expect(page.find('#builder-element').children()).toHaveLength(
        forms[0].children.length,
      )
      expect(page.find(FormProperties)).toHaveLength(1)
      done()
    })
  })
})
