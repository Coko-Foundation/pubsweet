import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from 'pubsweet-client'

import { ConnectPage } from 'xpub-connect'

import TeamsManager from './TeamsManager'

export default compose(
  ConnectPage(() => [
    actions.getCollections(),
    actions.getTeams(),
    actions.getUsers(),
  ]),
  connect(
    state => {
      const { collections, teams, error } = state
      // const { conversion, teams } = state
      const { users } = state.users

      return { teams, collections, users, error }
    },
    (dispatch, { history }) => ({
      deleteTeam: collection => dispatch(actions.deleteTeam(collection)),
      updateTeam: (project, version, reviewer, status) =>
        dispatch(actions.updateTeam(project, version, reviewer, status)),
      createTeam: () => dispatch(actions.createTeam),
    }),
  ),
  withRouter,
)(TeamsManager)
