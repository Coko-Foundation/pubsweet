import React from 'react'
import Immutable from 'immutable'
import Blogpost from './Blogpost'

import styles from '../scss/components/_blogpostList'

export default class BlogpostList extends React.Component {
  render () {
    const blogposts = this.props.manages.toKeyedSeq().map((manage, key) => {
      return (<Blogpost key={manage.get('id')} id={manage.get('id')} title={manage.getIn(['data', 'title'])} status={manage.getIn(['data', 'status'])}/>)
    }).toArray()
    return (
      <div className={styles['main-section']}>
        <h3 className={styles['main-section__header']}>Blog posts</h3>
        {blogposts}
      </div>
    )
  }
}

BlogpostList.propTypes = { manages: React.PropTypes.instanceOf(Immutable.OrderedMap) }
