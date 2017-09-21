import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import Draft from './Draft'

function mapStateToProps (state, props) {
  return {
    blog: state.collections[0],
    id: props.match.params.id,
    fragment: state.fragments[props.match.params.id]
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
