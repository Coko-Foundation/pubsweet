import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import styled, { ThemeProvider } from 'styled-components'
import theme from '@pubsweet/default-theme'

const rootReducer = combineReducers({
  form: formReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const Root = styled.div``

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Root>{children}</Root>
      </Router>
    </ThemeProvider>
  </Provider>
)

export default Wrapper
