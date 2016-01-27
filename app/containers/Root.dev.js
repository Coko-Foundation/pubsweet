import React, { Component, PropTypes } from 'react'
// import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import DevTools from './DevTools'

export default class Root extends Component {
  render () {
    return (
      <div>
        <ReduxRouter />
        <DevTools />
      </div>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
