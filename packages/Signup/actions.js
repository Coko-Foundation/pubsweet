import * as api from 'pubsweet-client/src/helpers/api'
import * as T from './types'
import { push } from 'react-router-redux'

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
  return dispatch => {
    dispatch(signupRequest())
    return api.create('/users', user).then(
      user => {
        dispatch(signupSuccess(user))
        dispatch(push('/login'))
      },
      err => dispatch(signupFailure(err))
    )
  }
}
