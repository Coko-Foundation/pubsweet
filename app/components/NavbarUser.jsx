import React, { Component, PropTypes } from 'react'
import { Nav, NavItem } from 'react-bootstrap'

export default class NavbarUser extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { onLogoutClick, username } = this.props

    return (
      <Nav pullRight>
        <NavItem pullRight><i className='fa fa-user'/> {username}</NavItem>
        <NavItem onClick={onLogoutClick}>Logout</NavItem>
      </Nav>
    )
  }

}

NavbarUser.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  roles: PropTypes.array
}
