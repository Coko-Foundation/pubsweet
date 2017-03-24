import React from 'react'

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
  user: React.PropTypes.object.isRequired,
  number: React.PropTypes.number
  // update: React.PropTypes.func.isRequired
}

export default User
