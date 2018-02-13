import React from 'react'
import PropTypes from 'prop-types'
import Authorize from 'pubsweet-client/src/helpers/Authorize'
import PostList from './PostList'
import PostCreator from './PostCreator'

export default class PostsManager extends React.Component {
  componentWillMount() {
    this.props.actions
      .getCollections()
      .then(result => this.props.actions.getFragments(result.collections[0]))
  }

  render() {
    const { blog, blogposts, actions, error, currentUser } = this.props
    const createBlogpost = fragment => actions.createFragment(blog, fragment)

    if (Array.isArray(blogposts) && blog) {
      return (
        <Authorize
          object={blog}
          operation="GET"
          unauthorized={<div>You are not authorized to view this page.</div>}
        >
          <div>
            {error ? <div>{error}</div> : null}
            <h2>{blog && blog.title}</h2>
            <h3>blog posts</h3>
            <PostList
              blog={blog}
              blogposts={blogposts}
              currentUser={currentUser}
              delete={actions.deleteFragment}
              update={actions.updateFragment}
            />
            <Authorize object={blog} operation="POST">
              <PostCreator create={createBlogpost} />
            </Authorize>
          </div>
        </Authorize>
      )
    }

    return null
  }
}

PostsManager.propTypes = {
  blog: PropTypes.object,
  blogposts: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
  currentUser: PropTypes.object,
}
