import React from 'react'
import Immutable from 'immutable'
import ManageItem from 'components/ManageItem'

import styles from 'scss/components/_manageList'

export default class ManageList extends React.Component {
  render () {
    const manages = this.props.manages.toKeyedSeq().map((manage, key) => {
      return (<ManageItem key={manage.get('id')} id={manage.get('id')} title={manage.getIn(['data', 'title'])} status={manage.getIn(['data', 'status'])}/>)
    }).toArray()
    return (
      <div className={styles['main-section']}>
        <h3 className={styles['main-section__header']}>Blog posts</h3>
        {manages}
      </div>
    )
  }
}

ManageList.propTypes = { manages: React.PropTypes.instanceOf(Immutable.OrderedMap) }
