import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import PostsManager from './PostsManager'

function mapState(state) {
  const blog = state.collections[0]
  const blogposts = blog
    ? blog.fragments.map(f => state.fragments[f]).filter(f => f)
    : []

  return {
    blog,
    blogposts,
    error: state.error,
    currentUser: state.currentUser,
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(
  mapState,
  mapDispatch,
)(PostsManager)
