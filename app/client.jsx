import React from 'react'
import { createStore } from 'redux'
import configureStore from './store/configureStore'
import Root from './containers/Root'

let store = createStore(configureStore)

React.render(
  <Root store={store} />,
  document.getElementById('root')
)
