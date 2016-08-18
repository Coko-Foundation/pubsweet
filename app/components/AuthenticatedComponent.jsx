import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import WaitingRoom from '../components/WaitingRoom/WaitingRoom'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount () {
      this.props.actions.hydrate().then(() => {
        this.checkAuth(this.props.auth.isAuthenticated)
      })
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.auth.isAuthenticated)
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
          {this.props.auth.isAuthenticated === true
              ? <Component {...this.props} />
              : <WaitingRoom />
          }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    location: PropTypes.object,
    username: PropTypes.string,
    roles: PropTypes.array,
    actions: React.PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  function mapState (state) {
    return {
      auth: state.auth
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
