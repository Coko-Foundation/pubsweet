import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS
} from '../actions/types'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth (state = {
  isFetching: false
}, action) {
  console.log(action)
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users
      })
    case GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}
