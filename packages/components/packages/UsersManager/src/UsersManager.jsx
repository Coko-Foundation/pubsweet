import React from 'react'
import PropTypes from 'prop-types'

import User from './User'

export default class UsersManager extends React.Component {
  componentWillMount() {
    this.props.actions.getUsers()
  }

  render() {
    const { users = [], actions, error } = this.props

    return (
      <div>
        {error ? <div>{error}</div> : null}
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <User
                  key={user.id}
                  number={key + 1}
                  update={actions.updateUser}
                  user={user}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

UsersManager.propTypes = {
  users: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
}
