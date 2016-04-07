import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

import NavbarUser from '../NavbarUser'

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
            <a href='#'>Science Blogger</a>
          </NavbarBrand>
        </Navbar.Header>
        <Nav eventKey={0}>
          <LinkContainer to='/contributor/posts'>
            <NavItem>Posts</NavItem>
          </LinkContainer>
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
