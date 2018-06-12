import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import config from 'config'
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
      const { users } = state.users

      const userOptions = users.map(user => ({
        value: user.id,
        label: user.username,
      }))

      const collectionsOptions = collections.map(collection => ({
        value: collection.id,
        label: collection.title,
      }))
      const types = config.authsome.teams
      const typesOptions = Object.keys(types).map(type => ({
        value: type,
        label: `${types[type].name} ${types[type].permissions}`,
      }))

      return { teams, collectionsOptions, userOptions, typesOptions, error }
    },
    (dispatch, { history }) => ({
      deleteTeam: collection => dispatch(actions.deleteTeam(collection)),
      updateTeam: (members, team) => {
        team = Object.assign(team, { members })
        return dispatch(actions.updateTeam(team))
      },
      createTeam: team => dispatch(actions.createTeam(team)),
    }),
  ),
)(TeamsManager)
