import React from 'react'
import configureStore from './store/configureStore'
import { render } from 'react-dom'
import Root from './containers/Root'

let store = configureStore()

render(
  <Root store={store} />,
 document.getElementById('root')
)

