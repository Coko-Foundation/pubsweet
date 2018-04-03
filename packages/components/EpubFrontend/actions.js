import fetch from 'isomorphic-fetch'
import { stringify } from 'querystring'
import * as T from './types'

function htmlToEpubRequest() {
  return {
    type: T.HTML_TO_EPUB_CONV_REQUEST,
  }
}

function htmlToEpubSuccess(extractedEpubPath) {
  return {
    type: T.HTML_TO_EPUB_CONV_SUCCESS,
    extractedEpubPath,
  }
}

function htmlToEpubFailure(message) {
  return {
    type: T.HTML_TO_EPUB_CONV_FAILURE,
    error: message,
  }
}

// TODO: use `api` from pubsweet-client instead of `fetch`, for authentication
export function htmlToEpub(bookId, options) {
  const params = stringify(options)

  return dispatch => {
    dispatch(htmlToEpubRequest())

    return fetch(`/api/collections/${bookId}/epub?${params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .then(data => dispatch(htmlToEpubSuccess(data.path)))
      .catch(err => {
        dispatch(htmlToEpubFailure(err))
        throw err
      })
  }
}
