import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Authsome from 'authsome'
import actions from '../actions'

// TODO refactor initial app to directly use component then remove this
export function requireAuthentication (Component, operation, selector) {
  return function WrappedAuthenticatedComponent (props) {
    return <ConnectedAuthenticatedComponent
      authsome={CONFIG['authsome']}
      {...props}
      component={Component}
      operation={operation}
      selector={selector}/>
  }
}

export class AuthenticatedComponent extends React.Component {
  constructor (props) {
    super(props)

    this.authsome = new Authsome(
      this.props.authsome.mode,
      { teams: this.props.authsome.teams }
    )

    this.checkAuthorization = this.checkAuthorization.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
    this.failRedirect = this.props.authsome['fail-redirect']
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
    const object = this.props.selector(this.props.state)
    const Component = this.props.component

    try {
      if (this.authsome.can(user, this.props.operation, object)) {
        return <Component {...this.props} />
      } else {
        return <span />
      }
    } catch (err) {
      return <span />
    }
  }

  checkAuth (currentUser) {
    let object = this.props.selector(this.props.state)

    if (!currentUser.isFetching) {
      if (!currentUser.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        return this.props.pushState(`/login?next=${redirectAfterLogin}`)
      } else if (!this.authsome.can(currentUser.user, this.props.operation, object) && this.failRedirect) {
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
  component: PropTypes.element.isRequired,
  selector: PropTypes.func.isRequired,
  operation: PropTypes.string.isRequired,
  authsome: PropTypes.shape({
    mode: PropTypes.func,
    teams: PropTypes.object,
    'fail-redirect': PropTypes.string
  }),
  location: PropTypes.object,
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
    actions: bindActionCreators(actions, dispatch)
  }
}

const ConnectedAuthenticatedComponent = connect(mapState, mapDispatch)(AuthenticatedComponent)

export default ConnectedAuthenticatedComponent
