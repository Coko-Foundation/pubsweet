import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from 'pubsweet-client/src/actions'
import Team from './Team'
import TeamCreator from './TeamCreator'

class TeamsManager extends React.Component {
  componentWillMount () {
    this.props.actions.getUsers().then(
      () => this.props.actions.getTeams()
    ).then(
      () => this.props.actions.getCollections()
    )
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
                types={CONFIG.authsome.teams}
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
  collections: React.PropTypes.array,
  users: React.PropTypes.array,
  teams: React.PropTypes.array,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    collections: state.collections,
    teams: state.teams,
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
