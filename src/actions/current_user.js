import * as api from '../helpers/api'
import * as T from './types'

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
    user: user
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
  return dispatch => {
    dispatch(getUserRequest())

    return api.get('/users/authenticate').then(
      user => dispatch(getUserSuccess(user)),
      err => dispatch(getUserFailure(err))
    )
  }
}
