import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signupUser } from './actions'

import Signup from './Signup'

function mapState(state) {
  return {
    error: state.error,
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators({ signupUser }, dispatch),
  }
}

export default connect(mapState, mapDispatch)(Signup)
