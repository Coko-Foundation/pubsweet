import React from 'react'

class User extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { user } = this.props
    return (
      <tr className='user' key={user.key}>
        <td>
          {user.key}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {user.roles}
        </td>
        <td>
          {user.permissions}
        </td>
      </tr>
    )
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default User
