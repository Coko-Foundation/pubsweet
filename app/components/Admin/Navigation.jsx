import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Navigation extends React.Component {

  render () {
    return (
      <Navbar brand='Science Blogger' toggleNavKey={0}>
        <Nav eventKey={0}>
          <LinkContainer to='/admin/manager'>
            <NavItem>Manager</NavItem>
          </LinkContainer>
          <LinkContainer to='/admin/about'>
            <NavItem>About</NavItem>
          </LinkContainer>
          <LinkContainer to='/signin'>
            <NavItem>Sign In</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = { ManageStore: React.PropTypes.object }
