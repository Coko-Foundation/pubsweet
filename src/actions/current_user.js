import { fetch } from '../helpers/Utils'
const config = require('config')
const API_ENDPOINT = config.get('pubsweet-backend.API_ENDPOINT')
import * as T from './types'

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
