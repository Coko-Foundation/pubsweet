import { fetch } from '../helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

const token = require('../helpers/authtoken')

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
  let config = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token() }
  }

  return dispatch => {
    dispatch(getUsersRequest())
    return fetch(API_ENDPOINT + '/users', config).then(
        response => response.json()
      ).then(
        users => dispatch(getUsersSuccess(users.users)),
        err => dispatch(getUsersFailure(err))
      )
  }
}

function getUserRequest (user) {
  return {
    type: T.GET_USER_REQUEST,
    user
  }
}

function getUserSuccess (user) {
  return {
    type: T.GET_USER_SUCCESS,
    user
  }
}

function getUserFailure (user, error) {
  return {
    type: T.GET_USER_FAILURE,
    user,
    error
  }
}

export function getUser (user) {
  return dispatch => {
    dispatch(getUserRequest(user))

    const config = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token()
      }
    }

    return fetch(API_ENDPOINT + '/users/' + user.id, config)
      .then(
        response => response.json()
      ).then(
        user => dispatch(getUserSuccess(user)),
        err => dispatch(getUserFailure(err))
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
  let config = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  return dispatch => {
    dispatch(updateUserRequest(user))
    return fetch(API_ENDPOINT + '/users/' + user.id, config)
      .then(
        response => response.json()
      ).then(
        user => dispatch(updateUserSuccess(user)),
        err => dispatch(updateUserFailure(err))
      )
  }
}
