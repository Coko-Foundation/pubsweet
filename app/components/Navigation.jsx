import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap'

import AuthHelper from '../helpers/AuthHelper'
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
      <Navbar fluid>
        <Navbar.Header>
          <NavbarBrand>
            <a href='#'><img src='/pubsweet-rgb-small.jpg' alt='pubsweet-logo'/></a>
          </NavbarBrand>
        </Navbar.Header>
        <Nav eventKey={0}>
          <LinkContainer to='/manage/posts'>
            <NavItem>Posts</NavItem>
          </LinkContainer>
          { AuthHelper.showForUser(auth, 'users') &&
            <LinkContainer to='/manage/users'>
              <NavItem>Users</NavItem>
            </LinkContainer>
          }
          { process.env.NODE_ENV === 'dev' &&
            <LinkContainer to='/manage/debug'>
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
