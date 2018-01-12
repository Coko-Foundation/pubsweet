import {
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  LOGOUT_SUCCESS,
} from '../actions/types'

const initialState = {
  isFetching: false,
  // TODO remove isAuthenticated in favour of !!user
  isAuthenticated: false,
  user: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
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
