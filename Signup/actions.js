import { fetch } from 'pubsweet-frontend/helpers/Utils'
import * as T from './types'
import { push } from 'react-router-redux'

const API_ENDPOINT = CONFIG['pubsweet-backend']['API_ENDPOINT']

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
