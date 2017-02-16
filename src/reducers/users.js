import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../actions/types'

// The users reducer.
export function users (state = {
  isFetching: false
}, action) {
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
    case UPDATE_USER_REQUEST:
      var users = state.users.map(function (user) {
        if (user.id === action.user.id) {
          return Object.assign(user, action.user)
        } else {
          return user
        }
      })
      return Object.assign({}, state, {
        isFetching: true,
        users: users
      })
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}
