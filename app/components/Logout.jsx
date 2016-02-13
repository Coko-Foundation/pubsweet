import React, { Component, PropTypes } from 'react'

export default class Logout extends Component {

  render () {
    const { onLogoutClick, username } = this.props

    return (
      <button onClick={() => onLogoutClick()} className='btn btn-default'>
        Logout, { username }
      </button>
    )
  }

}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  username: PropTypes.string
}
