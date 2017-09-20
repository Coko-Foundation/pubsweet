import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from 'pubsweet-client/src/actions'

import Blog from './Blog'

function mapStateToProps (state) {
  let blog = state && state.collections[0]
  let posts = blog ? blog.fragments.map(f => state.fragments[f]).filter(f => f) : []

  return {
    blog: state && state.collections[0],
    posts: posts
    // errorMessage: state.errorMessage
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
)(Blog)
