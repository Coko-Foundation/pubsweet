import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import WaitingRoom from '../components/WaitingRoom'

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
        this.props.pushState(null, `/login?next=${redirectAfterLogin}`)
      }

      if (this.props.currentRole === 'admin' &&
        this.props.location.pathname.substring(0, 6) !== '/admin') {
        console.log('Admin role selected, redirecting to the admin pages')
        this.props.pushState(null, '/admin/posts')
      } else if (this.props.currentRole === 'contributor' &&
        this.props.location.pathname.substring(0, 12) !== '/contributor') {
        console.log('Contributor role selected, redirecting to the contributor pages')
        this.props.pushState(null, '/contributor/posts')
      }
    }

    render () {
      return (
        <div>
          {this.props.auth.isAuthenticated === true && this.props.roles.length !== 0
              ? <Component {...this.props}/>
              : <WaitingRoom/>
          }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    location: PropTypes.object,
    username: PropTypes.string,
    roles: PropTypes.array,
    currentRole: PropTypes.string,
    actions: React.PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  function mapState (state) {
    return {
      currentRole: state.auth.currentRole,
      roles: state.auth.roles,
      auth: state.auth
    }
  }

  function mapDispatch (dispatch) {
    return {
      pushState: bindActionCreators(pushState, dispatch),
      actions: bindActionCreators(Actions, dispatch)
    }
  }

  return connect(mapState, mapDispatch)(AuthenticatedComponent)
}
