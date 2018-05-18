import clone from 'lodash/clone'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import unionBy from 'lodash/unionBy'
import differenceBy from 'lodash/differenceBy'

import {
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  UPDATE_TEAM_SUCCESS,
  DELETE_TEAM_SUCCESS,
  GET_COLLECTION_TEAMS_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types'

export default function(state = [], action) {
  const teams = clone(state)

  function getTeam() {
    return find(teams, { id: action.team.id })
  }
  function getTeamIndex() {
    return findIndex(teams, { id: action.team.id })
  }

  function addTeam() {
    if (!getTeam()) {
      teams.push(action.team)
    }
    return teams
  }

  function updateOne() {
    const index = getTeamIndex()
    teams[index] = { ...teams[index], ...action.update }
    return teams
  }

  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return addTeam()
    case UPDATE_TEAM_SUCCESS:
      return updateOne()
    case GET_TEAMS_SUCCESS:
      return clone(action.teams)
    case DELETE_TEAM_SUCCESS:
      return differenceBy(state, [action.team], 'id')
    case LOGOUT_SUCCESS:
      return []
    case GET_COLLECTION_TEAMS_SUCCESS:
      return unionBy(state, action.teams, 'id')
    default:
      return state
  }
}
