import request from 'pubsweet-client/src/helpers/api'
import * as T from './types'

const ENDPOINT = CONFIG['pubsweet-server']['API_ENDPOINT'].replace(/api$/, 'ink')

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
export function ink (file) {
  const data = new FormData()
  data.append('file', file)

  return dispatch => {
    dispatch(inkRequest())
    return request(ENDPOINT, data, { parse: false })
      .then(
        response => response.text() // TODO: return JSON from the backend
      ).then(
        response => dispatch(inkSuccess(response))
      ).catch(err => dispatch(inkFailure(err)))
  }
}
