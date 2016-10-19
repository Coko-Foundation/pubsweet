import { fetch } from 'pubsweet-frontend/helpers/Utils'
import * as T from './types'
import { push } from 'react-router-redux'

const API_ENDPOINT = CONFIG['pubsweet-backend']['API_ENDPOINT']

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
