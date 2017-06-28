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
  return users.map(user => {
    if (user.id === data.id) {
      return Object.assign(user, data)
    }

    return user
  })
}

// The users reducer.
export default (state = {
  isFetching: false
}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users
      })

    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        users: updatedUsers(state.users, action.user)
      })

    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        users: updatedUsers(state.users, action.user)
      })

    case LOGOUT_SUCCESS:
      return {
        isFetching: false
      }

    default:
      return state
  }
}
