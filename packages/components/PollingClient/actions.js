import fetch from 'isomorphic-fetch'
import * as T from './types'

function pollingRequest() {
  return {
    type: T.POLLING_REQUEST,
  }
}

function pollingSuccess() {
  return {
    type: T.POLLING_SUCCESS,
  }
}

function pollingFailure(message) {
  return {
    type: T.POLLING_FAILURE,
    error: message,
  }
}

export function polling(bookId, fragmentId, user) {
  return dispatch => {
    dispatch(pollingRequest())

    return fetch(
      `/api/collections/${bookId}/fragments/${fragmentId}?username=${
        user.username
      }`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response
      })
      .then(data => dispatch(pollingSuccess()))
      .catch(err => {
        dispatch(pollingFailure(err))
        throw err
      })
  }
}
