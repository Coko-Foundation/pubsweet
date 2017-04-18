import React, { Component, PropTypes } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import UpdateSubscriber from 'pubsweet-client/src/components/UpdateSubscriber'

export default class NavbarUser extends Component {
  render () {
    const { onLogoutClick, user } = this.props

    return (
      <Nav pullRight>
        <NavItem><UpdateSubscriber /></NavItem>
        <NavItem><i className="fa fa-user" /> {user.username} {`${user.admin ? '(admin)' : ''}`}</NavItem>
        <NavItem onClick={onLogoutClick} className="logout"><i className="fa fa-power-off" />&nbsp;Logout</NavItem>
      </Nav>
    )
  }
}

NavbarUser.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
