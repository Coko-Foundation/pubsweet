import React from 'react'
import configureStore from './store/configureStore'
import Root from './containers/Root'

let store = configureStore()

React.render(
  <Root store={store} />,
  document.getElementById('root')
)
