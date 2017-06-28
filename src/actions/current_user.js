import { fetch } from '../helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

const token = require('../helpers/authtoken')

function getCurrentUserRequest () {
  return {
    type: T.GET_CURRENT_USER_REQUEST
  }
}

function getCurrentUserSuccess (user) {
  return {
    type: T.GET_CURRENT_USER_SUCCESS,
    user
  }
}

function getCurrentUserFailure (error) {
  return {
    type: T.GET_CURRENT_USER_FAILURE,
    error
  }
}

export function getCurrentUser () {
  return dispatch => {
    const config = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token()
      }
    }

    dispatch(getCurrentUserRequest())

    return fetch(
      API_ENDPOINT + '/users/authenticate', config
    ).then(
      response => response.json()
    ).then(
      user => dispatch(getCurrentUserSuccess(user))
    ).catch(
      err => dispatch(getCurrentUserFailure(err))
    )
  }
}
