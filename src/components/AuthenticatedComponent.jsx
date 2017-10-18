import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import actions from '../actions'

export class AuthenticatedComponent extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser().then(() => this.checkAuth(this.props))
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  checkAuth({ isFetching, isAuthenticated }) {
    if (!isFetching && !isAuthenticated) {
      const redirectAfterLogin = this.props.location.pathname
      this.props.pushState(`/login?next=${redirectAfterLogin}`)
    }
  }

  render() {
    return this.props.children
  }
}

AuthenticatedComponent.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  getCurrentUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  pushState: PropTypes.func.isRequired,
}

function mapState(state) {
  return {
    isFetching: state.currentUser.isFetching,
    isAuthenticated: state.currentUser.isAuthenticated,
  }
}

const ConnectedAuthenticatedComponent = withRouter(
  connect(mapState, {
    getCurrentUser: actions.getCurrentUser,
    pushState: push,
  })(AuthenticatedComponent),
)

export default ConnectedAuthenticatedComponent
