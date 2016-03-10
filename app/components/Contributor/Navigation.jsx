import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Logout from '../Logout'

export default class Navigation extends React.Component {

  render () {
    const { actions, auth } = this.props
    let loginOrLogoutButton
    if (auth.isAuthenticated) {
      loginOrLogoutButton = <Logout username={auth.username} onLogoutClick={() => actions.logoutUser() } />
    } else {
      loginOrLogoutButton = <LinkContainer to='/login'>
          <NavItem>Log In</NavItem>
        </LinkContainer>
    }
    return (
      <Navbar brand='Science Blogger' toggleNavKey={0}>
        <Nav eventKey={0}>
          <LinkContainer to='/contributor/manager'>
            <NavItem>Manager</NavItem>
          </LinkContainer>
          <LinkContainer to='/contributor/about'>
            <NavItem>About</NavItem>
          </LinkContainer>
          { loginOrLogoutButton }
        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object
}
