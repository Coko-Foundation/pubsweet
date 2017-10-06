import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import routes from 'app/routes'

export default class Root extends React.Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            { routes }
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}
