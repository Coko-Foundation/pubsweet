import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount () {
      this.props.actions.getUser().then(
        () => this.checkAuth(this.props.currentUser.isAuthenticated)
      )
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.currentUser.isAuthenticated)
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        this.props.pushState(`/login?next=${redirectAfterLogin}`)
      }
    }

    render () {
      return (
        <div>
          {this.props.currentUser.isAuthenticated === true && <Component {...this.props} />}
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    location: React.PropTypes.object,
    username: React.PropTypes.string,
    actions: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    pushState: React.PropTypes.func.isRequired
  }

  function mapState (state) {
    return {
      currentUser: state.currentUser
    }
  }

  function mapDispatch (dispatch) {
    return {
      pushState: bindActionCreators(push, dispatch),
      actions: bindActionCreators(Actions, dispatch)
    }
  }

  return connect(mapState, mapDispatch)(AuthenticatedComponent)
}
