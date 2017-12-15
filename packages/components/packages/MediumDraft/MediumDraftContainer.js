import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import MediumDraft from './MediumDraft'

function mapStateToProps(state, props) {
  const fragmentId = props.match.params.id
  return {
    fragmentId,
    blog: state.collections[0],
    id: fragmentId,
    fragment: state.fragments[fragmentId],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediumDraft)
