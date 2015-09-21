import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import styles from 'scss/components/_navigation'

export default class Navigation extends React.Component {

  render () {
    return (
      <Navbar brand='PubSweet'>
        <Nav>
          <LinkContainer to='/admin'>
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to='/admin/dashboard'>
            <NavItem>Dashboard</NavItem>
          </LinkContainer>
          <LinkContainer to='/admin/about' className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>
            <NavItem>About</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = { ManageStore: React.PropTypes.object }
