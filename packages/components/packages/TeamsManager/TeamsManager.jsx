import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Alert } from 'react-bootstrap'
import config from 'config'

import Team from './Team'
import TeamCreator from './TeamCreator'

export default class TeamsManager extends React.Component {
  componentWillMount() {
    this.props.actions.getUsers()
    this.props.actions.getTeams()
    this.props.actions.getCollections()
  }

  render() {
    const { teams = [], actions, error, users, collections } = this.props

    if (teams && collections && users) {
      return (
        <div className="bootstrap pubsweet-component pubsweet-component-scroll">
          <Grid>
            {error ? <Alert bsStyle="warning">{error}</Alert> : null}
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Object</th>
                    <th>Members</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, key) => (
                    <Team
                      delete={actions.deleteTeam}
                      key={team.id}
                      number={key + 1}
                      team={team}
                      update={actions.updateTeam}
                      users={users}
                    />
                  ))}
                </tbody>
              </table>
              <TeamCreator
                collections={collections}
                create={actions.createTeam}
                types={config.authsome.teams}
              />
            </div>
          </Grid>
        </div>
      )
    }
    return null
  }
}

TeamsManager.propTypes = {
  collections: PropTypes.array,
  users: PropTypes.array,
  teams: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
}
