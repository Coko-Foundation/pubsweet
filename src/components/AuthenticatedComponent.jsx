import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import config from 'config'
import Authsome from 'authsome'
import actions from '../actions'

// TODO refactor initial app to directly use component then remove this
export function requireAuthentication (Component, operation, selector) {
  return function WrappedAuthenticatedComponent (props) {
    return <ConnectedAuthenticatedComponent
      authsome={config['authsome']}
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

  checkAuth (currentUser) {
    let object = this.props.selector(this.props.state)

    if (!currentUser.isFetching) {
      if (!currentUser.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        this.props.pushState(`/login?next=${redirectAfterLogin}`)
      } else if (!this.authsome.can(currentUser.user, this.props.operation, object)) {
        this.props.pushState(this.failRedirect)
      }
    }
  }

  render () {
    const {
      selector,
      state,
      component: Component,
      operation,
      children,
      ...otherProps
    } = this.props

    const object = selector(state)
    try {
      if (this.authsome.can(this.props.currentUser.user, operation, object)) {
        return children || <Component {...otherProps} />
      }
    } catch (e) {}

    return null
  }
}

AuthenticatedComponent.propTypes = {
  children: PropTypes.node,
  component: PropTypes.func,
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

const ConnectedAuthenticatedComponent = withRouter(connect(mapState, mapDispatch)(AuthenticatedComponent))

export default ConnectedAuthenticatedComponent
