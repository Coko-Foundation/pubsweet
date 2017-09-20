import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import Draft from './Draft'

function mapStateToProps (state, ownProps) {
  return {
    blog: state.collections[0],
    id: ownProps.params.id,
    fragment: state.fragments[ownProps.params.id]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Draft)
