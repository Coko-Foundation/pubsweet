import React from 'react'
import PropTypes from 'prop-types'

const User = props => (
  <tr className="user">
    <td>{props.number}</td>
    <td>{props.user.username}</td>
    <td>{props.user.email}</td>
  </tr>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
  number: PropTypes.number,
}

export default User
