import React from 'react'
import PropTypes from 'prop-types'

const User = props => (
  <tr className="user">
    <td>{props.user.id}</td>
    <td>{props.user.username}</td>
    <td>{props.user.email}</td>
    <td>{props.user.admin ? 'yes' : ''}</td>
  </tr>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User
