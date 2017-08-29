import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../actions/types'

import { LOGOUT_SUCCESS } from 'pubsweet-component-login/types'

// TODO: store users as an object/map instead of an array

const updatedUsers = (users, data) => {
  const index = users.findIndex(user => user.id === data.id)

  if (index === -1) {
    users.push(data)
  } else {
    users[index] = {...users[index], ...data}
  }

  return users
}

// The users reducer.
export default (state = {
  isFetching: false,
  users: []
}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.users
      }

    case GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: updatedUsers(state.users, action.user)
      }

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: updatedUsers(state.users, action.user)
      }

    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        users: []
      }

    default:
      return state
  }
}
