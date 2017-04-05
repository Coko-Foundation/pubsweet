import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from 'pubsweet-client/src/store/configureStore'
import Root from 'pubsweet-client/src/components/Root'

import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

let store = configureStore(browserHistory, {})
let history = syncHistoryWithStore(browserHistory, store)

const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('pubsweet-client/src/components/Root', () => {
    const NextRoot = require('pubsweet-client/src/components/Root').default

    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootEl
    )
  })
}
