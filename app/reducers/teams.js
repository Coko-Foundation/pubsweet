import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS
} from '../actions/types'

export default function teams (state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case GET_TEAMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        teams: action.teams
      })
    case GET_TEAMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}
