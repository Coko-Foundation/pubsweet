import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import currentUser from 'pubsweet-client/src/reducers/currentUser'
import { createStore, combineReducers } from 'redux'
import { JournalProvider } from 'xpub-journal'
import { MockedProvider } from 'react-apollo/test-utils'
import gql from 'graphql-tag'
import styled, { ThemeProvider } from 'styled-components'
import ErrorBoundary from './ErrorBoundary'
import { currentTheme, themes, componentStore } from './StyleGuideRenderer'
import * as journal from '../../config/journal'

const rootReducer = combineReducers({
  form: formReducer,
  currentUser,
})

const store = createStore(
  rootReducer,
  {
    currentUser: {
      user: {
        admin: true,
        type: 'user',
        id: 1,
      },
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const mocks = [
  {
    request: {
      query: gql`
        query CurrentUser {
          currentUser {
            admin
            id
            username
          }
        }
      `,
    },
    result: {
      data: {
        currentUser: { id: 1, username: 'admin', admin: true },
      },
    },
  },
]

const Root = styled.div``

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      themeName: currentTheme.name,
    }
  }
  componentDidMount() {
    componentStore.addComponent(this)
  }
  componentWillUnmount() {
    componentStore.removeComponent(this)
  }
  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <ThemeProvider theme={themes[this.state.themeName]}>
              <JournalProvider journal={journal}>
                <Router>
                  <Root>{this.props.children}</Root>
                </Router>
              </JournalProvider>
            </ThemeProvider>
          </MockedProvider>
        </Provider>
      </ErrorBoundary>
    )
  }
}

export default Wrapper
