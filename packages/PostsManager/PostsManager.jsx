import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Alert } from 'react-bootstrap'
import PostList from './PostList'
import PostCreator from './PostCreator'
import Authorize from 'pubsweet-client/src/helpers/Authorize'
import styles from './PostsManager.local.scss'
import blogmode from 'authsome/src/modes/blog'
const authsome = { mode: blogmode }


export default class PostsManager extends React.Component {
  componentWillMount () {
    this.props.actions.getCollections()
      .then(result => this.props.actions.getFragments(result.collections[0]))
  }

  render () {
    const { blog, blogposts, actions, error, currentUser } = this.props
    const createBlogpost = fragment => actions.createFragment(blog, fragment)

    if (Array.isArray(blogposts) && blog) {
      return (
        <div className="bootstrap">
          <div className={styles.container}>
            <Grid>
              {error ? <Alert bsStyle="warning">{error}</Alert> : null}
              <h2 className={styles['header']}>{blog && blog.title}</h2>
              <h3 className={styles['header']}>blog posts</h3>
              <PostList
                update={actions.updateFragment}
                delete={actions.deleteFragment}
                blogposts={blogposts}
                blog={blog}
                currentUser={currentUser} />
              <Authorize operation="create" object={blog} authsome={authsome}>
                <PostCreator create={createBlogpost} />
              </Authorize>
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
  blog: PropTypes.object,
  blogposts: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
  currentUser: PropTypes.object
}
