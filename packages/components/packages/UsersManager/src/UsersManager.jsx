import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'

import User from './User'

const configuredTeams = config.authsome.teams

export default class UsersManager extends React.Component {
  componentWillMount() {
    this.props.actions.getUsers()
  }

  render() {
    const { users = [], actions, error, teams = [] } = this.props

    return (
      <div>
        {error ? <div>{error}</div> : null}
        <div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Teams</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <User
                  configuredTeams={configuredTeams}
                  createTeam={actions.createTeam}
                  getTeams={actions.getTeams}
                  key={user.id}
                  number={key + 1}
                  teams={teams}
                  update={actions.updateUser}
                  updateTeam={actions.updateTeam}
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
  teams: PropTypes.array,
  error: PropTypes.string,
}
