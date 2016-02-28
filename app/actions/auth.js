import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config'
import * as T from './types'
import { pushState } from 'redux-router'

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
    token: user.token
  }
}

function loginFailure (message) {
  return {
    type: T.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
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

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser (credentials, redirectTo) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${credentials.username}&password=${credentials.password}`
  }

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(loginRequest(credentials))
    return fetch(API_ENDPOINT + '/users/authenticate', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailure(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', user.token)
          // Dispatch the success action
          dispatch(loginSuccess(user))
          // Only redirect if we want to
          if (redirectTo) {
            dispatch(pushState(null, redirectTo))
          }
        }
      }).catch(err => console.log('Error: ', err))
  }
}

// Logs the user out
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
    username: user.username,
    token: user.token
  }
}

function getUserFailure (message) {
  return {
    type: T.GET_USER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
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
      .then(function (response) {
        if (!response.ok) {
          dispatch(getUserFailure(response.status))
          return Promise.reject(response)
        } else {
          return response
        }
      }).then(function (response) {
        return response.json()
      }).then(user => ({ user }))
      .then(({ user, response }) => {
        user.token = localStorage.token
        dispatch(getUserSuccess(user))
      }).catch(err => console.log('Error: ', err))
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
    username: user.username
  }
}

function signupFailure (message) {
  return {
    type: T.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
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
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          dispatch(signupFailure(user.message))
          return Promise.reject(user)
        } else {
          dispatch(signupSuccess(user))
        }
      }).catch(err => console.log('Error: ', err))
  }
}
