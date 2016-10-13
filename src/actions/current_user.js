import { fetch } from '../helpers/Utils'
import { API_ENDPOINT } from '../../config'
import * as T from './types'
import { push } from 'react-router-redux'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

function getUserRequest () {
  return {
    type: T.GET_USER_REQUEST,
    isFetching: true
  }
}

function getUserSuccess (user) {
  return {
    type: T.GET_USER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user,
    token: user.token
  }
}

function getUserFailure (message) {
  return {
    type: T.GET_USER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error: message
  }
}

export function getUser () {
  let config = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + localStorage.token }
  }

  return dispatch => {
    dispatch(getUserRequest())
    return fetch(API_ENDPOINT + '/users/authenticate', config)
      .then(
        response => response.json()
      ).then(
        user => dispatch(getUserSuccess(user)),
        err => dispatch(getUserFailure(err))
      )
  }
}

function signupRequest () {
  return {
    type: T.SIGNUP_REQUEST,
    isFetching: true
  }
}

function signupSuccess (user) {
  return {
    type: T.SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user
  }
}

function signupFailure (message) {
  return {
    type: T.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error: message
  }
}

export function signupUser (user) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return dispatch => {
    dispatch(signupRequest())
    return fetch(API_ENDPOINT + '/users', config)
      .then(
        response => response.json()
      ).then(
        user => {
          dispatch(signupSuccess(user))
          dispatch(push('/login'))
        },
        err => dispatch(signupFailure(err))
      )
  }
}
