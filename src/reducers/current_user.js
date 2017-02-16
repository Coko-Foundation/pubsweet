const token = require('../helpers/authtoken')

import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE
} from '../actions/types'

export function currentUser (state = {
  isFetching: false,
  isAuthenticated: false,
  token: token()
}, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token
      })
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    default:
      return state
  }
}
