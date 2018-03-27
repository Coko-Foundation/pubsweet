import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { JournalProvider } from 'xpub-journal'
import * as journal from 'xpub-styleguide/src/config/journal'
import styled, { ThemeProvider } from 'styled-components'
import theme from '@pubsweet/default-theme'
import ErrorBoundary from './ErrorBoundary'

const rootReducer = combineReducers({
  form: formReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const Root = styled.div``

const Wrapper = ({ children }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <JournalProvider journal={journal}>
          <Router>
            <Root>{children}</Root>
          </Router>
        </JournalProvider>
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>
)

export default Wrapper
