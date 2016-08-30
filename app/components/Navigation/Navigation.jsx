import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

import Authorize from '../../helpers/Authorize'
import NavbarUser from './NavbarUser'

export default class Navigation extends React.Component {

  render () {
    const { actions, currentUser } = this.props
    let logoutButtonIfAuthenticated
    if (currentUser.isAuthenticated) {
      logoutButtonIfAuthenticated = <NavbarUser
        user={currentUser.user}
        onLogoutClick={actions.logoutUser}
      />
    }
    return (
      <Navbar fluid>
        <Navbar.Header>
          <NavbarBrand>
            <a href="#"><img src="/pubsweet-rgb-small.jpg" alt="pubsweet-logo" /></a>
          </NavbarBrand>
        </Navbar.Header>
        <Nav eventKey={0}>
          <LinkContainer to="/manage/posts">
            <NavItem>Posts</NavItem>
          </LinkContainer>
          { Authorize.can(currentUser, 'users') &&
            <LinkContainer to="/manage/users">
              <NavItem>Users</NavItem>
            </LinkContainer>
          }
        </Nav>
        { logoutButtonIfAuthenticated }
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object
}
