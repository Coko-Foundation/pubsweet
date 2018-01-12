import { push } from 'react-router-redux'
import * as api from 'pubsweet-client/src/helpers/api'
import * as T from './types'

function signupRequest() {
  return {
    type: T.SIGNUP_REQUEST,
  }
}

function signupSuccess(user) {
  return {
    type: T.SIGNUP_SUCCESS,
    user,
  }
}

function signupFailure(message) {
  return {
    type: T.SIGNUP_FAILURE,
    error: message,
  }
}

export function signupUser(user) {
  return dispatch => {
    dispatch(signupRequest())
    return api.create('/users', user).then(
      user => {
        dispatch(signupSuccess(user))
        dispatch(push('/login'))
      },
      err => dispatch(signupFailure(err)),
    )
  }
}
