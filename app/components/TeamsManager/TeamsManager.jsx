import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../actions'
import Team from './Team'
import TeamCreator from './TeamCreator'

import config from '../../../config'

class TeamsManager extends React.Component {
  componentWillMount () {
    this.props.actions.getUsers().then(() => {
      this.props.actions.getTeams()
    })
  }

  render () {
    let { teams, actions, error, users, collections, fragments } = this.props

    if (teams) {
      teams = teams.map((team, key) => {
        return (<Team
          number={key + 1}
          key={team.id}
          team={team}
          update={actions.updateTeam}
          users={users}
        />)
      })
    }

    return (
      <div className="bootstrap">
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
                </tr>
              </thead>
              <tbody>
                { teams }
              </tbody>
            </table>
            <TeamCreator
              create={actions.createTeam}
              collections={collections}
              fragments={fragments}
              types={config.authsome.teams}
            />
          </div>
        </Grid>
      </div>
    )
  }
}

TeamsManager.propTypes = {
  collections: React.PropTypes.array.isRequired,
  fragments: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  teams: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    collections: state.collections,
    fragments: state.fragments,
    teams: state.teams.teams,
    users: state.users.users,
    error: state.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsManager)
