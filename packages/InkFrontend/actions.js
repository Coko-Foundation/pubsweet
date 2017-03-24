import { fetch } from 'pubsweet-frontend/src/helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-backend']['API_ENDPOINT']

function inkRequest () {
  return {
    type: T.INK_REQUEST,
    isFetching: true
  }
}

function inkSuccess (converted) {
  return {
    type: T.INK_SUCCESS,
    isFetching: false,
    converted: converted
  }
}

function inkFailure (message) {
  return {
    type: T.INK_FAILURE,
    isFetching: false,
    error: message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function ink(file) {
  var data = new FormData()
  data.append('file', file)

  let config = {
    method: 'POST',
    body: data
  }

  return dispatch => {
    dispatch(inkRequest())
    return fetch(API_ENDPOINT.slice(0, -4) + '/ink', config)
      .then(
        response => response.text()
      ).then(
        response => dispatch(inkSuccess(response))
      ).catch(err => dispatch(inkFailure(err)))
  }
}