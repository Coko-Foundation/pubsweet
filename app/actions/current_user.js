import { fetch } from '../helpers/Utils'
import { API_ENDPOINT } from '../../config'
import * as T from './types'
import { push } from 'react-router-redux'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

// There are three possible states for our login
// process and we need actions for each of them
function loginRequest (credentials) {
  return {
    type: T.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function loginSuccess (user) {
  return {
    type: T.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
    user: user
  }
}

function loginFailure (message) {
  return {
    type: T.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error: message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser (credentials, redirectTo) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${credentials.username}&password=${credentials.password}`
  }

  return dispatch => {
    dispatch(loginRequest(credentials))
    return fetch(API_ENDPOINT + '/users/authenticate', config)
      .then(
        response => response.json()
      ).then(
        user => {
          localStorage.setItem('token', user.token)
          dispatch(loginSuccess(user))
          if (redirectTo) dispatch(push(redirectTo))
        },
        err => dispatch(loginFailure(err))
      )
  }
}

function logoutRequest () {
  return {
    type: T.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function logoutSuccess () {
  return {
    type: T.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
// Since we are using JWTs, we just need to remove the token
// from localStorage.
export function logoutUser () {
  return dispatch => {
    dispatch(logoutRequest())
    localStorage.removeItem('token')
    dispatch(logoutSuccess())
  }
}

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
