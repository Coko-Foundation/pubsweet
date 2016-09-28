import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

import Authorize from 'pubsweet-frontend/src/helpers/Authorize'
import NavbarUser from 'pubsweet-components/Navigation/NavbarUser'

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
            <a href='#'><img src='/pubsweet.jpg' alt='pubsweet' /></a>
          </NavbarBrand>
        </Navbar.Header>
        <Nav eventKey={0}>
          <LinkContainer to='/manage/posts'>
            <NavItem>Posts</NavItem>
          </LinkContainer>
          <Authorize operation='read' object='users'>
            <LinkContainer to='/manage/users'>
              <NavItem>Users</NavItem>
            </LinkContainer>
          </Authorize>
          <Authorize operation='read' object='teams'>
            <LinkContainer to='/manage/teams'>
              <NavItem>Teams</NavItem>
            </LinkContainer>
          </Authorize>
        </Nav>
        { logoutButtonIfAuthenticated }
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  actions: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object
}
