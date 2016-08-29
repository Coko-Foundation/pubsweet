import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import routes from 'PubSweet-routes'

export default class Root extends React.Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            { routes(store) }
          </Router>
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
}
