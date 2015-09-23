import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Navigation extends React.Component {

  render () {
    return (
      <Navbar brand='PubSweet'>
        <Nav>
          <LinkContainer to='/admin/manage'>
            <NavItem>Manage</NavItem>
          </LinkContainer>
          <LinkContainer to='/admin/about'>
            <NavItem>About</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = { ManageStore: React.PropTypes.object }
