import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Alert } from 'react-bootstrap'
import config from 'config'

import Team from './Team'
import TeamCreator from './TeamCreator'

export default class TeamsManager extends React.Component {
  componentWillMount () {
    this.props.actions.getUsers()
    this.props.actions.getTeams()
    this.props.actions.getCollections()
  }

  render () {
    let { teams, actions, error, users, collections } = this.props

    if (teams) {
      teams = teams.map((team, key) => {
        return (<Team
          number={key + 1}
          key={team.id}
          team={team}
          update={actions.updateTeam}
          delete={actions.deleteTeam}
          users={users}
        />)
      })
    }

    if (teams && collections && users) {
      return (
        <div className="bootstrap pubsweet-component pubsweet-component-scroll">
          <Grid>
            { error ? <Alert bsStyle="warning">{error}</Alert> : null}
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
                  { teams }
                </tbody>
              </table>
              <TeamCreator
                create={actions.createTeam}
                collections={collections}
                types={config.authsome.teams}
              />
            </div>
          </Grid>
        </div>
      )
    } else {
      return null
    }
  }
}

TeamsManager.propTypes = {
  collections: PropTypes.array,
  users: PropTypes.array,
  teams: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string
}
