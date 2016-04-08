import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

import NavbarUser from './NavbarUser'

export default class Navigation extends React.Component {

  render () {
    const { actions, auth } = this.props
    let logoutButtonIfAuthenticated
    if (auth.isAuthenticated) {
      logoutButtonIfAuthenticated = <NavbarUser
        roles={auth.roles}
        username={auth.username}
        switchRole={actions.switchRole}
        onLogoutClick={actions.logoutUser}
      />
    }
    return (
      <Navbar>
        <Navbar.Header>
          <NavbarBrand>
            <a href='#'>PubSweet Science Blogger</a>
          </NavbarBrand>
        </Navbar.Header>
        <Nav eventKey={0}>
          <LinkContainer to='/admin/posts'>
            <NavItem>Posts</NavItem>
          </LinkContainer>
          <LinkContainer to='/admin/users'>
            <NavItem>Users</NavItem>
          </LinkContainer>
          {
            process.env.NODE_ENV === 'dev' &&
            <LinkContainer to='/admin/debug'>
              <NavItem>Debug</NavItem>
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
  auth: PropTypes.object
}
