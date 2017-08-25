import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import config from 'config'

import Authsome from 'authsome'

import Actions from '../actions'

export function requireAuthentication (Component, operation, selector, mode) {
  class AuthenticatedComponent extends React.Component {
    constructor (props) {
      super(props)

      this.authsome = new Authsome(
        mode,
        { teams: config['authsome'].teams }
      )

      this.checkAuthorization = this.checkAuthorization.bind(this)
      this.checkAuth = this.checkAuth.bind(this)
      this.failRedirect = config['authsome']['fail-redirect']
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

    checkAuthorization (user) {
      let object = selector(this.props.state)

      try {
        if (this.authsome.can(user, operation, object)) {
          return <Component {...this.props} />
        } else {
          return <span />
        }
      } catch (err) {
        return <span />
      }
    }

    checkAuth (currentUser) {
      let object = selector(this.props.state)

      if (!currentUser.isFetching) {
        if (!currentUser.isAuthenticated) {
          let redirectAfterLogin = this.props.location.pathname
          return this.props.pushState(`/login?next=${redirectAfterLogin}`)
        } else if (!this.authsome.can(currentUser.user, operation, object) && this.failRedirect) {
          this.props.pushState(this.failRedirect)
        } else {
          this.checkAuthorization(currentUser.user)
        }
      }
    }

    render () {
      return (
        <div>
          { this.checkAuthorization(this.props.currentUser.user) }
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
