import React from 'react'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory'
import { Router } from 'react-router'
import routes from './routes.jsx'
import store from './store'
let store = createStore(store)

const history = createHistory()

React.render(
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>,
  container
)
