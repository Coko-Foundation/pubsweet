import React, { Component, PropTypes } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem } from 'react-bootstrap'

export default class Logout extends Component {

  render () {
    const { onLogoutClick, username } = this.props

    return (
      <Nav pullRight>
        <NavItem pullRight><i className='fa fa-user'/> {username}</NavItem>
        <NavItem onClick={() => onLogoutClick()}>Logout</NavItem>
      </Nav>
    )
  }

}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  username: PropTypes.string
}
