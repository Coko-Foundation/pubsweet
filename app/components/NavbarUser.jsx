import React, { Component, PropTypes } from 'react'
import { Nav, NavItem, Input, Navbar } from 'react-bootstrap'

export default class NavbarUser extends Component {
  constructor (props) {
    super(props)
    this.switchRole = this.switchRole.bind(this)
  }

  switchRole () {
    this.props.switchRole(this.refs.role.getValue())
  }

  render () {
    const { onLogoutClick, username, currentRole } = this.props

    const roles = this.props.roles.map((role, key) => {
      return <option value={role}>{'Role: ' + role}</option>
    })

    return (
      <Nav pullRight>
        <Navbar.Form pullLeft>
          <Input
            type='select'
            ref='role'
            placeholder={currentRole}
            onChange={this.switchRole}
          >
            { roles }
          </Input>
        </Navbar.Form>
        <NavItem pullRight><i className='fa fa-user'/> {username}</NavItem>
        <NavItem onClick={onLogoutClick}>Logout</NavItem>
      </Nav>
    )
  }

}

NavbarUser.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  roles: PropTypes.array,
  currentRole: PropTypes.string,
  switchRole: PropTypes.func
}
