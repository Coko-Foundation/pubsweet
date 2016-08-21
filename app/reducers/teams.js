import {
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  UPDATE_TEAM_SUCCESS
} from '../actions/types'

import _ from 'lodash'

export default function teams (state = [], action) {
  const teams = _.clone(state)

  function updateOne () {
    const index = _.findIndex(teams, { id: action.team.id })
    if (index !== -1) {
      teams[index] = _.assign(teams[index], action.team)
    } else {
      teams.push(action.team)
    }

    return teams
  }

  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
    case UPDATE_TEAM_SUCCESS: return updateOne()
    case GET_TEAMS_SUCCESS: return _.clone(action.teams)
  }

  return state
}
