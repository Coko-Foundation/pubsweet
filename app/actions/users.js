import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config'
import * as T from './types'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

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
    headers: { 'Authorization': 'Bearer ' + localStorage.token }
  }

  return dispatch => {
    dispatch(getUsersRequest())
    return fetch(API_ENDPOINT + '/users', config)
      .then(response =>
        response.json().then(users => ({ users, response }))
      ).then(({ users, response }) => {
        if (!response.ok) {
          dispatch(getUsersFailure(users.message))
          return Promise.reject(users)
        } else {
          dispatch(getUsersSuccess(users.users))
        }
      }).catch(err => console.log('Error: ', err))
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
      'Authorization': 'Bearer ' + localStorage.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  return dispatch => {
    dispatch(updateUserRequest(user))
    return fetch(API_ENDPOINT + '/users/' + user._id, config)
      .then(response => {
        if (response.ok) {
          return response.json().then(user => {
            dispatch(updateUserSuccess(user))
          })
        } else {
          return response.json().then(response => {
            dispatch(updateUserFailure(response.message))
            throw new Error(response.message)
          })
        }
      }).catch(err => {
        dispatch(updateUserFailure(err.message))
        console.log('Error: ', err)
      })
  }
}

