import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import MediumDraft from './MediumDraft'

function mapStateToProps (state, ownProps) {
  let fragmentId = ownProps.params.id
  return {
    fragmentId: fragmentId,
    blog: state.collections[0],
    id: ownProps.params.id,
    fragment: state.fragments[fragmentId]
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
)(MediumDraft)
