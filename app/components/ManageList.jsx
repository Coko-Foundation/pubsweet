import React from 'react'
import Immutable from 'immutable'
import ManageItem from 'components/ManageItem'

import styles from 'scss/components/_vote'

export default class ManageList extends React.Component {
  render () {
    const manages = this.props.manages.toKeyedSeq().map((manage, key) => {
      return (<ManageItem id={key} key={key} title={manage.getIn(['data', 'title'])} />)
    }).toArray()
    return (
      <div className={styles['main-section']}>
        <h3 className={styles['main-section__header']}>Blog posts</h3>
        <ul className={styles['main-section__list']}>{manages}</ul>
      </div>
    )
  }
}

ManageList.propTypes = { manages: React.PropTypes.instanceOf(Immutable.OrderedMap) }
