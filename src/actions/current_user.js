import { fetch } from '../helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

const token = require('../helpers/authtoken')

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
    headers: { 'Authorization': 'Bearer ' + token() }
  }

  return dispatch => {
    dispatch(getUserRequest())
    return fetch(
      API_ENDPOINT + '/users/authenticate', config
    ).then(
      response => response.json()
    ).then(
      user => dispatch(getUserSuccess(user))
    ).catch(
      err => dispatch(getUserFailure(err))
    )
  }
}
