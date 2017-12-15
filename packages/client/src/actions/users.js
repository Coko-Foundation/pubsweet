import * as api from '../helpers/api'
import * as T from './types'

function getUsersRequest() {
  return {
    type: T.GET_USERS_REQUEST,
    isFetching: true,
  }
}

function getUsersSuccess(users) {
  return {
    type: T.GET_USERS_SUCCESS,
    isFetching: false,
    users,
  }
}

function getUsersFailure(message) {
  return {
    type: T.GET_USERS_FAILURE,
    isFetching: false,
    message,
  }
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersRequest())

    return api
      .get('/users')
      .then(
        users => dispatch(getUsersSuccess(users.users)),
        err => dispatch(getUsersFailure(err)),
      )
  }
}

function getUserRequest(user) {
  return {
    type: T.GET_USER_REQUEST,
    user,
  }
}

function getUserSuccess(user) {
  return {
    type: T.GET_USER_SUCCESS,
    user,
  }
}

function getUserFailure(user, error) {
  return {
    type: T.GET_USER_FAILURE,
    user,
    error,
  }
}

export function getUser(user) {
  return dispatch => {
    dispatch(getUserRequest(user))

    return api
      .get(`/users/${user.id}`)
      .then(
        user => dispatch(getUserSuccess(user)),
        err => dispatch(getUserFailure(err)),
      )
  }
}

function updateUserRequest(user) {
  return {
    type: T.UPDATE_USER_REQUEST,
    user,
    isFetching: true,
  }
}

function updateUserSuccess(users) {
  return {
    type: T.UPDATE_USER_SUCCESS,
    isFetching: false,
    users,
  }
}

function updateUserFailure(message) {
  return {
    type: T.UPDATE_USER_FAILURE,
    isFetching: false,
    error: message,
  }
}

export function updateUser(user) {
  return dispatch => {
    dispatch(updateUserRequest(user))

    const url = `/users/${user.id}`

    return api
      .update(url, user)
      .then(
        user => dispatch(updateUserSuccess(user)),
        err => dispatch(updateUserFailure(err)),
      )
  }
}
