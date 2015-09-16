import React from 'react'
import { Link } from 'react-router'

import styles from 'scss/components/_navigation'

export default class Navigation extends React.Component {

  render () {
    return (
      <nav className={styles.navigation} role='navigation'>
          <Link className={styles.navigation__item} to='/'>Home</Link>
          <Link className={styles.navigation__item} to='/dashboard'>Dashboard</Link>
          <Link to='/about' className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
      </nav>
    )
  }

}

Navigation.propTypes = { ManageStore: React.PropTypes.object }
