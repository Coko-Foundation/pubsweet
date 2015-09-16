import React from 'react'

import ManageList from 'components/ManageList'
import ManageCreate from 'components/ManageCreate'

import styles from 'scss/components/_vote'

export default class Manage extends React.Component {

  render () {
    return (
      <div className={styles.vote}>
        <ManageCreate manage={this.props.ManageStore.newManage} />
        <ManageList manages={this.props.ManageStore.manages} />
      </div>
    )
  }
}

Manage.propTypes = {
  ManageStore: React.PropTypes.object
}
