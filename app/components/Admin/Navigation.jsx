import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Logout from '../Logout'

export default class Navigation extends React.Component {

  render () {
    const { actions, auth } = this.props
    return (
      <Navbar brand='Science Blogger' toggleNavKey={0}>
        <Nav eventKey={0}>
          <LinkContainer to='/admin/manager'>
            <NavItem>Manager</NavItem>
          </LinkContainer>
          <LinkContainer to='/admin/about'>
            <NavItem>About</NavItem>
          </LinkContainer>
          { auth.isAuthenticated &&
            <Logout onLogoutClick={() => actions.logoutUser() } />
          }
          { !auth.isAuthenticated &&
            <LinkContainer to='/admin/login'>
              <NavItem>Log In</NavItem>
            </LinkContainer>
          }

        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object
}
