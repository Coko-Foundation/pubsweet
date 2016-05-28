import React from 'react'
import Blogpost from './Blogpost'

import styles from '../scss/components/BlogpostList'

export default class BlogpostList extends React.Component {
  render () {
    const blogposts = this.props.blogposts.map((blogpost, key) => {
      var id = blogpost._id ? blogpost._id : key + 1
      return (<Blogpost
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

BlogpostList.propTypes = {
  update: React.PropTypes.func,
  delete: React.PropTypes.func,
  blogposts: React.PropTypes.array,
  auth: React.PropTypes.object
}
