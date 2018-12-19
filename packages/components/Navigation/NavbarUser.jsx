import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem } from 'react-bootstrap'
import UpdateSubscriber from 'pubsweet-client/src/components/UpdateSubscriber'

const NavbarUser = props => (
  <Nav pullRight>
    <NavItem>
      <UpdateSubscriber />
    </NavItem>
    <NavItem>
      <i className="fa fa-user" /> {props.user.username}{' '}
      {`${props.user.admin ? '(admin)' : ''}`}
    </NavItem>
    <NavItem className="logout" onClick={props.onLogoutClick}>
      <i className="fa fa-power-off" />
      &nbsp;Logout
    </NavItem>
  </Nav>
)

NavbarUser.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default NavbarUser
