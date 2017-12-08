import { unionBy } from 'lodash'

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types'

// TODO: store users as an object/map instead of an array

// The users reducer.
export default (
  state = {
    isFetching: false,
    users: [],
  },
  action,
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.users,
      }

    case GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: unionBy([action.user], state.users, 'id'),
      }

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: unionBy([action.user], state.users, 'id'),
      }

    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        users: [],
      }

    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        users: unionBy([action.user], state.users, 'id'),
      }

    default:
      return state
  }
}
