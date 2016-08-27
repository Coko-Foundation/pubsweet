import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import PostList from './PostList'
import PostCreator from './PostCreator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './PostsManager.local.scss'
import * as Actions from '../../actions'
import { fragmentsOfCollection } from '../../helpers/Utils'

class PostsManager extends React.Component {
  componentWillMount () {
    this.props.actions.getCollections()
      .then(result => this.props.actions.getFragments(result.collections[0]))
  }

  render () {
    const { blog, blogposts, actions, error, currentUser } = this.props
    let createBlogpost = (fragment) => { actions.createFragment(blog, fragment) }

    if (Array.isArray(blogposts)) {
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
                blog={blog}
                currentUser={currentUser} />
              <PostCreator create={createBlogpost} />
            </Grid>
          </div>
        </div>
      )
    } else {
      return false
    }
  }
}

PostsManager.propTypes = {
  blog: React.PropTypes.object,
  blogposts: React.PropTypes.array,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.string,
  currentUser: React.PropTypes.object
}

function mapState (state) {
  let blogposts

  blogposts = fragmentsOfCollection(state.collections[0], state.fragments)

  return {
    blog: state.collections[0],
    blogposts: blogposts,
    error: state.error,
    currentUser: state.currentUser
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
