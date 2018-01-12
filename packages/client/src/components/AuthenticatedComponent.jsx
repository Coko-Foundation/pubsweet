import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import actions from '../actions'
import { selectCurrentUser } from '../selectors'

const isAllowedRedirect = pathname =>
  !['/logout', '/login', '/signup'].includes(pathname)

export class AuthenticatedComponent extends React.Component {
  componentWillMount() {
    this.props.ensureCurrentUser().then(() => this.checkAuth(this.props))
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  checkAuth({ isFetching, isAuthenticated }) {
    if (!isFetching && !isAuthenticated) {
      const returnUrl = this.props.location.pathname
      let loginUrl = '/login'
      if (isAllowedRedirect(returnUrl)) {
        loginUrl += `?next=${returnUrl}`
      }
      this.props.pushState(loginUrl)
    }
  }

  render() {
    return this.props.isAuthenticated ? this.props.children : null
  }
}

AuthenticatedComponent.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  ensureCurrentUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  pushState: PropTypes.func.isRequired,
}

function mapState(state) {
  return {
    isFetching: state.currentUser.isFetching,
    isAuthenticated: !!selectCurrentUser(state),
  }
}

const ConnectedAuthenticatedComponent = withRouter(
  connect(mapState, {
    ensureCurrentUser: actions.ensureCurrentUser,
    pushState: push,
  })(AuthenticatedComponent),
)

export default ConnectedAuthenticatedComponent
