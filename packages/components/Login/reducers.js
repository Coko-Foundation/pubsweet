import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from 'pubsweet-client/src/actions/types'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

export default function userLogin(
  state = {
    isFetching: false,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
  },
  action,
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        username: action.credentials.username,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.error,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
