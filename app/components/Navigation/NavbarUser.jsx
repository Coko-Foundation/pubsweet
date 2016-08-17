import React, { Component, PropTypes } from 'react'
import { Nav, NavItem } from 'react-bootstrap'

export default class NavbarUser extends Component {
  render () {
    const { onLogoutClick, username } = this.props

    return (
      <Nav pullRight>
        <NavItem pullRight><i className="fa fa-user" /> {username}</NavItem>
        <NavItem onClick={onLogoutClick} className="logout"><i className="fa fa-power-off" />&nbsp;Logout</NavItem>
      </Nav>
    )
  }

}

NavbarUser.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  roles: PropTypes.array
}
