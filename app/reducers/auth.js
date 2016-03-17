// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST,
  GET_USER_SUCCESS, GET_USER_FAILURE, SIGNUP_SUCCESS
} from '../actions/types'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth (state = {
  isFetching: false,
  roles: [],
  isAuthenticated: localStorage.getItem('token') !== null,
  token: localStorage.getItem('token')
}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        roles: [],
        username: action.username
      })
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        username: action.credentials.username
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        roles: action.roles
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        username: action.username,
        token: action.token,
        roles: action.roles
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
