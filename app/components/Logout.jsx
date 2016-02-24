import React, { Component, PropTypes } from 'react'

export default class Logout extends Component {

  render () {
    const { onLogoutClick, username } = this.props

    return (
      <li>
        <button onClick={() => onLogoutClick()} className='btn btn-default navbar-btn'>
          Logout, { username }
        </button>
      </li>
    )
  }

}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  username: PropTypes.string
}
