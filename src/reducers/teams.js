import {
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  UPDATE_TEAM_SUCCESS,
  DELETE_TEAM_SUCCESS,
  GET_COLLECTION_TEAMS_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/types'

import clone from 'lodash/clone'
import findIndex from 'lodash/findIndex'
import difference from 'lodash/difference'
import unionBy from 'lodash/unionBy'

export default function (state = [], action) {
  const teams = clone(state)

  function updateOne () {
    const index = findIndex(teams, { id: action.team.id })
    if (index !== -1) {
      teams[index] = {...teams[index], ...action.team}
    } else {
      teams.push(action.team)
    }

    return teams
  }

  function removeTeams () {
    const todel = (action.teams || [action.team])
    return difference(state, todel)
  }

  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
    case UPDATE_TEAM_SUCCESS: return updateOne()
    case GET_TEAMS_SUCCESS: return clone(action.teams)
    case DELETE_TEAM_SUCCESS: return removeTeams()
    case LOGOUT_SUCCESS: return []
    case GET_COLLECTION_TEAMS_SUCCESS: return unionBy(state, action.teams, 'id')
  }

  return state
}
