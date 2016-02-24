import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Navigation from '../components/Admin/Navigation'
import '../scss/main'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  render () {
    const { children, auth, actions } = this.props
    return (
      <div>
        <div className='bootstrap'>
          <Navigation
            auth={auth}
            actions={actions}
            />
        </div>
        {children}
      </div>
    )
  }
}

Admin.propTypes = {
  // Dispatch
  dispatch: PropTypes.func.isRequired,
  // Auth
  auth: PropTypes.object,
  // Data
  collection: PropTypes.object,
  // Injected by React Redux
  errorMessage: PropTypes.string,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  actions: React.PropTypes.object.isRequired
}

function mapState (state) {
  return {
    auth: state.auth,
    collection: state.collections[0],
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}

function mapDispatch (dispatch) {
  return {
    pushState: pushState,
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapState,
  mapDispatch
)(Admin)
