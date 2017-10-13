import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import Authorize from '../helpers/Authorize'
import actions from '../actions'

export class AuthenticatedComponent extends React.Component {
  componentWillMount () {
    this.props.actions.getCurrentUser().then(
      () => this.checkAuth(this.props.currentUser)
    )
  }

  componentWillReceiveProps (nextProps) {
    this.checkAuth(nextProps.currentUser)
  }

  checkAuth (currentUser) {
    if (!currentUser.isFetching && !currentUser.isAuthenticated) {
      const redirectAfterLogin = this.props.location.pathname
      this.props.pushState(`/login?next=${redirectAfterLogin}`)
    }
  }

  render () {
    const { operation, object, unauthorized, children } = this.props
    return (
      <Authorize
        operation={operation}
        object={object}
        unauthorized={unauthorized}
      >
        {children}
      </Authorize>
    )
  }
}

AuthenticatedComponent.propTypes = {
  children: PropTypes.node,
  unauthorized: PropTypes.node,
  object: PropTypes.object.isRequired,
  operation: PropTypes.string.isRequired,
  location: PropTypes.object,
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  pushState: PropTypes.func.isRequired
}

function mapState (state, ownProps) {
  return {
    currentUser: state.currentUser,
    object: ownProps.selector(state)
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
