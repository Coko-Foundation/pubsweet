import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import HTML from './HTML'

function mapStateToProps(state, props) {
  return {
    id: props.match.params.id,
    fragment: state.fragments[props.match.params.id],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HTML)
