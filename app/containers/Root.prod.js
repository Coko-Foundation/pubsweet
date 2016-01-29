import React, { Component, PropTypes } from 'react'
import { ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'

export default class Root extends Component {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
