import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import actions from '../actions'
import { selectCurrentUser } from '../selectors'

export class AuthenticatedComponent extends React.Component {
  componentWillMount() {
    this.props.ensureCurrentUser().then(() => this.checkAuth(this.props))
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  createReturnUrl = ({ pathname, search = '' }) => pathname + search

  checkAuth = ({ isFetching, isAuthenticated }) => {
    const { location, pushState } = this.props
    if (!isFetching && !isAuthenticated) {
      const returnUrl = this.createReturnUrl(location)
      const loginUrl = `/login?next=${returnUrl}`
      pushState(loginUrl, {
        from: { pathname: returnUrl },
      })
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
