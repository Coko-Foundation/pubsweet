import {
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  LOGOUT_SUCCESS,
} from '../actions/types'

export default function(
  state = {
    isFetching: false,
    isAuthenticated: false,
  },
  action,
) {
  switch (action.type) {
    case GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      }

    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
      }

    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
      }

    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: false,
        user: null,
      }

    default:
      return state
  }
}
