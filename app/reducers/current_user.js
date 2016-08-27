// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST,
  GET_USER_SUCCESS, GET_USER_FAILURE, SIGNUP_SUCCESS
} from '../actions/types'

export default function currentUser (state = {
  isFetching: false,
  isAuthenticated: false,
  token: localStorage.getItem('token')
}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        user: action.user
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
        user: action.user,
        token: action.token
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
