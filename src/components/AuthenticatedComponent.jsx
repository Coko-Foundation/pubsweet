import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import actions from '../actions'

export class AuthenticatedComponent extends React.Component {
  componentWillMount () {
    this.props.actions.getCurrentUser().then(
      () => this.checkAuth(this.props)
    )
  }

  componentWillReceiveProps (nextProps) {
    this.checkAuth(nextProps)
  }

  checkAuth ({isFetching, isAuthenticated}) {
    if (!isFetching && !isAuthenticated) {
      const redirectAfterLogin = this.props.location.pathname
      this.props.pushState(`/login?next=${redirectAfterLogin}`)
    }
  }

  render () {
    return this.props.children
  }
}

AuthenticatedComponent.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  actions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  pushState: PropTypes.func.isRequired
}

function mapState (state) {
  return {
    isFetching: state.currentUser.isFetching,
    isAuthenticated: state.currentUser.isAuthenticated
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
