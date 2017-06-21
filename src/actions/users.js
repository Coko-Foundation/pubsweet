import * as api from '../helpers/api'
import * as T from './types'

function getUsersRequest () {
  return {
    type: T.GET_USERS_REQUEST,
    isFetching: true
  }
}

function getUsersSuccess (users) {
  return {
    type: T.GET_USERS_SUCCESS,
    isFetching: false,
    users: users
  }
}

function getUsersFailure (message) {
  return {
    type: T.GET_USERS_FAILURE,
    isFetching: false,
    message
  }
}

export function getUsers () {
  return dispatch => {
    dispatch(getUsersRequest())

    return api.get('/users').then(
      users => dispatch(getUsersSuccess(users.users)),
      err => dispatch(getUsersFailure(err))
    )
  }
}

function updateUserRequest (user) {
  return {
    type: T.UPDATE_USER_REQUEST,
    user: user,
    isFetching: true
  }
}

function updateUserSuccess (users) {
  return {
    type: T.UPDATE_USER_SUCCESS,
    isFetching: false,
    users: users
  }
}

function updateUserFailure (message) {
  return {
    type: T.UPDATE_USER_FAILURE,
    isFetching: false,
    error: message
  }
}

export function updateUser (user) {
  return dispatch => {
    dispatch(updateUserRequest(user))

    const url = '/users/' + user.id

    // TODO: remove "true" once the server supports PATCH for updates
    return api.update(url, user, true).then(
      user => dispatch(updateUserSuccess(user)),
      err => dispatch(updateUserFailure(err))
    )
  }
}
