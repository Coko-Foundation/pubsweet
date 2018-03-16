import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

const PostList = props => {
  const blogposts = props.blogposts.map((blogpost, key) => {
    const id = blogpost.id ? blogpost.id : key + 1
    return (
      <Post
        blog={props.blog}
        blogpost={blogpost}
        currentUser={props.currentUser}
        delete={props.delete}
        key={id}
        number={key + 1}
        update={props.update}
      />
    )
  })
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{blogposts}</tbody>
      </table>
    </div>
  )
}

PostList.propTypes = {
  update: PropTypes.func,
  delete: PropTypes.func,
  blogposts: PropTypes.array,
  blog: PropTypes.object,
  currentUser: PropTypes.object,
}

export default PostList
