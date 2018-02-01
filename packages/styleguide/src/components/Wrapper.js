import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import styled, { injectGlobal } from 'styled-components'

import '@pubsweet/default-theme'

const rootReducer = combineReducers({
  form: formReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

injectGlobal`
  body: {
    overflow: hidden;
  }
`

const Root = styled.div`
  font-family: var(--font-interface), sans-serif;
`

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <Router>
      <Root>{children}</Root>
    </Router>
  </Provider>
)

export default Wrapper
