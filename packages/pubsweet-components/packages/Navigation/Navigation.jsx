import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

import Authorize from 'pubsweet-client/src/helpers/Authorize'
import NavbarUser from './NavbarUser'

const Navigation = ({ actions, currentUser }) => (
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
      <Authorize operation='GET' object={{path: '/users'}}>
        <LinkContainer to='/manage/users'>
          <NavItem>Users</NavItem>
        </LinkContainer>
      </Authorize>
      <Authorize operation='GET' object={{path: '/teams'}}>
        <LinkContainer to='/manage/teams'>
          <NavItem>Teams</NavItem>
        </LinkContainer>
      </Authorize>
    </Nav>
    {
      currentUser &&
      currentUser.isAuthenticated &&
      <NavbarUser user={currentUser.user} onLogoutClick={actions.logoutUser}/>
    }
  </Navbar>
)

Navigation.propTypes = {
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object
}

export default Navigation
