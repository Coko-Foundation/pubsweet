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
        <a href="/">
          <img alt="pubsweet" src="/pubsweet.jpg" />
        </a>
      </NavbarBrand>
    </Navbar.Header>
    <Nav eventKey={0}>
      <LinkContainer to="/manage/posts">
        <NavItem>Posts</NavItem>
      </LinkContainer>
      <Authorize object={{ path: '/users' }} operation="GET">
        <LinkContainer to="/manage/users">
          <NavItem>Users</NavItem>
        </LinkContainer>
      </Authorize>
      <Authorize object={{ path: '/teams' }} operation="GET">
        <LinkContainer to="/manage/teams">
          <NavItem>Teams</NavItem>
        </LinkContainer>
      </Authorize>
    </Nav>
    {currentUser && currentUser.isAuthenticated && (
      <NavbarUser onLogoutClick={actions.logoutUser} user={currentUser.user} />
    )}
  </Navbar>
)

Navigation.propTypes = {
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
}

export default Navigation
