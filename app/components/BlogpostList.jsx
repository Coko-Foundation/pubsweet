import React from 'react'
import Blogpost from './Blogpost'

import styles from '../scss/components/_blogpostList'

export default class BlogpostList extends React.Component {
  render () {
    const blogposts = this.props.blogposts.map((blogpost, key) => {
      return (<Blogpost
        key={blogpost._id}
        blogpost={blogpost}
        delete={this.props.delete}
        update={this.props.update}
      />)
    })
    return (
      <div className={styles['list']}>
        <h3 className={styles['header']}>Blog posts</h3>
        {blogposts}
      </div>
    )
  }
}

BlogpostList.propTypes = {
  update: React.PropTypes.func,
  delete: React.PropTypes.func,
  blogposts: React.PropTypes.array
}
