import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Authsome from 'authsome'

import Actions from '../actions'

export function requireAuthentication (Component, operation, selector) {
  class AuthenticatedComponent extends React.Component {
    constructor (props) {
      super(props)

      this.authsome = new Authsome(
        CONFIG['authsome'].mode,
        { teams: CONFIG['authsome'].teams }
      )

      this.checkAuthorization = this.checkAuthorization.bind(this)
      this.checkAuth = this.checkAuth.bind(this)
      this.failRedirect = CONFIG['authsome']['fail-redirect']
    }

    componentWillMount () {
      this.props.actions.getCurrentUser().then(
        () => this.props.actions.getCollections()
      ).then(
        () => this.checkAuth(this.props.currentUser)
      )
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.currentUser)
    }

    checkAuthorization () {
      let currentUser = this.props.currentUser.user
      let object = selector(this.props.state)

      try {
        if (this.authsome.can(currentUser, operation, object)) {
          return <Component {...this.props} />
        } else if (this.failRedirect) {
          return this.props.pushState(this.failRedirect)
        } else {
          <span />
        }
      } catch (err) {
        return <span />
      }
    }

    checkAuth (currentUser) {
      if (!currentUser.isFetching && !currentUser.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        this.props.pushState(`/login?next=${redirectAfterLogin}`)
      }
      this.checkAuthorization()
    }

    render () {
      return (
        <div>
          { this.checkAuthorization() }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    location: PropTypes.object,
    username: PropTypes.string,
    actions: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    state: PropTypes.object
  }

  function mapState (state) {
    return {
      currentUser: state.currentUser,
      state: state
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
