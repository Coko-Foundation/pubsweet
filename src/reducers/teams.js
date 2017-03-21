import {
  GET_TEAMS_SUCCESS,
  CREATE_TEAM_SUCCESS,
  UPDATE_TEAM_SUCCESS,
  DELETE_TEAM_SUCCESS
} from '../actions/types'

import clone from 'lodash/clone'
import findIndex from 'lodash/findIndex'
import assign from 'lodash/assign'
import difference from 'lodash/difference'

export default function teams (state = [], action) {
  const teams = clone(state)

  function updateOne () {
    const index = findIndex(teams, { id: action.team.id })
    if (index !== -1) {
      teams[index] = assign(teams[index], action.team)
    } else {
      teams.push(action.team)
    }

    return teams
  }

  function removeTeams () {
    const todel = (action.teams || [action.team])
    let teams = difference(state, todel)
    return teams
  }

  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
    case UPDATE_TEAM_SUCCESS: return updateOne()
    case GET_TEAMS_SUCCESS: return clone(action.teams)
    case DELETE_TEAM_SUCCESS: return removeTeams()
  }

  return state
}
