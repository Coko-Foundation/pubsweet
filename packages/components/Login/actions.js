import * as api from 'pubsweet-client/src/helpers/api'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from 'pubsweet-client/src/actions/types'

import { push } from 'react-router-redux'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

// There are three possible states for our login
// process and we need actions for each of them
function loginRequest(credentials) {
  return {
    type: LOGIN_REQUEST,
    credentials,
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    token: user.token,
    user,
  }
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: message,
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(credentials, redirectTo, setErrors) {
  return dispatch => {
    dispatch(loginRequest(credentials))
    return api.create('/users/authenticate', credentials).then(
      user => {
        localStorage.setItem('token', user.token)
        dispatch(loginSuccess(user))
        if (redirectTo) dispatch(push(redirectTo))
      },
      err => {
        setErrors(JSON.parse(err.response).message)
        dispatch(loginFailure(err))
      },
    )
  }
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  }
}

// Logs the user out
// Since we are using JWTs, we just need to remove the token
// from localStorage.
export function logoutUser(redirectTo) {
  return dispatch => {
    dispatch(logoutRequest())
    localStorage.removeItem('token')
    dispatch(logoutSuccess())
    if (redirectTo) dispatch(push(redirectTo))
  }
}
