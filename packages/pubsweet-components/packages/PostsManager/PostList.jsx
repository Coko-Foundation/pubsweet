import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

import styles from './PostList.scss'

export default class PostList extends React.Component {
  render () {
    const blogposts = this.props.blogposts.map((blogpost, key) => {
      var id = blogpost.id ? blogpost.id : key + 1
      return (<Post
        number={key + 1}
        key={id}
        blogpost={blogpost}
        blog={this.props.blog}
        delete={this.props.delete}
        update={this.props.update}
        currentUser={this.props.currentUser}
      />)
    })
    return (
      <div className={styles['list']}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="index">#</th>
              <th className="main">Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogposts}
          </tbody>
        </table>
      </div>
    )
  }
}

PostList.propTypes = {
  update: PropTypes.func,
  delete: PropTypes.func,
  blogposts: PropTypes.array,
  blog: PropTypes.object,
  currentUser: PropTypes.object
}
