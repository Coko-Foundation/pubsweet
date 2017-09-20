import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ink } from './actions'

import InkFrontend from './InkFrontend'

function mapState (state) {
  return {
    error: state.error,
    ink: state.ink
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ ink }, dispatch)
  }
}

export default connect(
    mapState, mapDispatch
)(InkFrontend)
