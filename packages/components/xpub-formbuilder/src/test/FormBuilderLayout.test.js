import React from 'react'
import Enzyme, { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider } from 'styled-components'
import { combineReducers } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { reducers } from 'pubsweet-client'

import FormProperties from '../components/FormProperties'
import FormBuilderLayout from '../components/FormBuilderLayout'
import noforms from './config/noforms.json'

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
      { forms: { forms: { noforms } } },
    ),
  )

describe('FormBuilder Layout', () => {
  const makeWrapper = (props = {}) => {
    const store = mockStore()
    return mount(
      <MemoryRouter>
        <ThemeProvider
          theme={{
            colorPrimary: 'blue',
            colorSecondary: '#E7E7E7',
          }}
        >
          <Provider store={store}>
            <FormBuilderLayout {...props} />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>,
    )
  }

  it('shows just the create form tab', () => {
    const formbuilder = makeWrapper({
      properties: {
        type: 'form',
      },
      activeTab: 'new',
    })

    formbuilder.find(FormProperties).debug()
    // console.log(diveTo(formbuilder, 'withProps(withState(withHandlers(ReduxForm)))', {}).debug())
    // console.log(formbuilder.find('branch(withProps(ReduxForm))').dive().dive().dive().debug())
    // expect(diveTo(formbuilder, 'branch(withProps(ReduxForm))', {})).toHaveLength(1)

    // expect(
    //   diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
    //     .dive()
    //     .find('#add-element'),
    // ).toHaveLength(1)
  })

  // it('shows add element button and form elements', () => {
  //   const formbuilder = makeWrapper({ form: forms[0] })

  //   expect(
  //     diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
  //       .dive()
  //       .find('#builder-element')
  //       .dive()
  //       .at(0),
  //   ).toHaveLength(2)

  //   expect(
  //     diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
  //       .dive()
  //       .find('#add-element'),
  //   ).toHaveLength(1)
  // })

  // it('adds empty element to the form', () => {
  //   const formbuilder = makeWrapper()
  //   expect(
  //     diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
  //       .dive()
  //       .find('#builder-element'),
  //   ).toHaveLength(0)

  //   diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
  //     .dive()
  //     .find('#add-element')
  //     .dive()
  //     .find(Action)
  //     .simulate('click')

  //   formbuilder.update()

  //   expect(
  //     diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
  //       .dive()
  //       .find('#builder-element'),
  //   ).toHaveLength(1)
  // })
})
