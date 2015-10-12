import React from 'react'
import { Grid } from 'react-bootstrap'
import ManageList from './ManageList'
import ManageCreate from './ManageCreate'

import styles from '../scss/components/_manage'

export default class Manage extends React.Component {

  render () {
    return (
      <Grid>
        <div className={styles.vote}>
          <ManageCreate manage={this.props.ManageStore.newManage} />
          <ManageList manages={this.props.ManageStore.manages} />
        </div>
      </Grid>
    )
  }
}

Manage.propTypes = {
  ManageStore: React.PropTypes.object
}
