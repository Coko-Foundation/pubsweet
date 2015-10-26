import React from 'react'
import Blogpost from './Blogpost'

import styles from '../scss/components/_blogpostList'

export default class BlogpostList extends React.Component {
  render () {
    const blogposts = this.props.blogposts.map((blogpost, key) => {
      return (<Blogpost key={blogpost.id} id={blogpost.id} title={blogpost.title} status={blogpost.status}/>)
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
  blogposts: React.PropTypes.array
}
