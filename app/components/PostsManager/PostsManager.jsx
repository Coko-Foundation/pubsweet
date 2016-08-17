import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import PostList from './PostList'
import PostCreator from './PostCreator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './PostsManager.local.scss'
import * as Actions from '../../actions'

class PostsManager extends React.Component {
  render () {
    const { blog, blogposts, actions, error, auth } = this.props
    return (
      <div className="bootstrap">
        <div className={styles.container}>
          <Grid>
            { error ? <Alert bsStyle="warning">{error}</Alert> : null}
            <h2 className={styles['header']}>{blog && blog.title}</h2>
            <h3 className={styles['header']}>blog posts</h3>
            <PostList
              update={actions.updateFragment}
              delete={actions.deleteFragment}
              blogposts={blogposts}
              auth={auth} />
            <PostCreator create={actions.createFragment} />
          </Grid>
        </div>
      </div>
    )
  }
}

PostsManager.propTypes = {
  blog: React.PropTypes.object.isRequired,
  blogposts: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.object,
  auth: React.PropTypes.object
}

function mapState (state) {
  return {
    blog: state.collections[0],
    blogposts: state.fragments,
    error: state.error,
    auth: state.auth
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapState,
  mapDispatch
)(PostsManager)
