import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem, NavBrand } from 'react-bootstrap'

import Logout from '../Logout'

export default class Navigation extends React.Component {

  render () {
    const { actions, auth } = this.props
    let logoutButtonIfAuthenticated
    if (auth.isAuthenticated) {
      logoutButtonIfAuthenticated = <Logout username={auth.username} onLogoutClick={() => actions.logoutUser() } />
    }
    return (
      <Navbar>
        <Navbar.Header>
          <NavBrand>
            <a href='#'>Science Blogger</a>
          </NavBrand>
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
