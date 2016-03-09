import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated)
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated)
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        this.props
          .dispatch(pushState(null, `/login?next=${redirectAfterLogin}`))
      }

      if (this.props.roles.indexOf('admin')) {
        console.log(this)
      } else if (this.props.roles.indexOf('contributor')) {
        console.log(this)
      }
    }

    render () {
      return (
        <div>
          {this.props.isAuthenticated === true
              ? <Component {...this.props}/>
              : null
          }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object,
    username: PropTypes.string,
    roles: PropTypes.array
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
    roles: state.auth.roles
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
