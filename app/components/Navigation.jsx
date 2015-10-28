import React from 'react'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Navigation extends React.Component {

  render () {
    return (
      <Navbar brand='Science Blogger'>
        <Nav>
          <LinkContainer to='/admin/manager'>
            <NavItem>Manager</NavItem>
          </LinkContainer>
          <IndexLinkContainer to='/'>
            <NavItem>Share</NavItem>
          </IndexLinkContainer>
          <LinkContainer to='/admin/about'>
            <NavItem>About</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = { ManageStore: React.PropTypes.object }
