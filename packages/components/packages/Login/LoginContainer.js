import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from './actions'

import Login from './Login'

function mapState (state) {
  return {
    error: state.error
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ loginUser }, dispatch)
  }
}

export default connect(
    mapState, mapDispatch
)(Login)
