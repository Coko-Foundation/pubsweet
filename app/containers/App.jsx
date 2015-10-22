import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Navigation from '../components/Navigation'
import '../scss/main'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  renderErrorMessage () {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p>
        <b>{errorMessage}</b>
      </p>
    )
  }

  render () {
    const { children, collection } = this.props
    return (
      <div>
        <p>{collection.title}</p>
        <Navigation />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Data
  collection: PropTypes.object,
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps (state) {
  return {
    collection: state.collection[0],
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  pushState
})(App)
