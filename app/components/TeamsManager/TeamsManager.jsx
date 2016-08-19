import React from 'react'
import { Grid, Alert } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

import Team from './Team'

class TeamsManager extends React.Component {
  componentWillMount () {
    this.props.actions.getTeams()
  }

  render () {
    let { teams, actions, error } = this.props

    if (teams) {
      teams = teams.map((team, key) => {
        return (<Team
          number={key + 1}
          key={team.id}
          team={team}
          update={actions.updateTeam}
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
          </div>
        </Grid>
      </div>
    )
  }
}

TeamsManager.propTypes = {
  teams: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  error: React.PropTypes.string
}

function mapStateToProps (state) {
  return {
    teams: state.teams.teams,
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
