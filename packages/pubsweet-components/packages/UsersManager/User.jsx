import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
  render () {
    let { user, number } = this.props

    return (
      <tr className="user">
        <td>
          {number}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          {user.email}
        </td>
      </tr>
    )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  number: PropTypes.number
}

export default User
