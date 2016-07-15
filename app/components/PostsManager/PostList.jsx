import React from 'react'
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
        delete={this.props.delete}
        update={this.props.update}
        auth={this.props.auth}
      />)
    })
    return (
      <div className={styles['list']}>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th className='index'>#</th>
              <th className='main'>Title</th>
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
  update: React.PropTypes.func,
  delete: React.PropTypes.func,
  blogposts: React.PropTypes.array,
  auth: React.PropTypes.object
}
