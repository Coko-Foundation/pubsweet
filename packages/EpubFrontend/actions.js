import fetch from 'isomorphic-fetch'
import * as T from './types'

function htmlToEpubRequest() {
  return {
    type: T.HTML_TO_EPUB_CONV_REQUEST
  }
}

function htmlToEpubSuccess(extractedEpubPath) {
  return {
    type: T.HTML_TO_EPUB_CONV_SUCCESS,
    extractedEpubPath: extractedEpubPath
  }
}

function htmlToEpubFailure(message) {
  return {
    type: T.HTML_TO_EPUB_CONV_FAILURE,
    error: message
  }
}

export function htmlToEpub(bookId) {
  return dispatch => {
    dispatch(htmlToEpubRequest())

    let opts = {
      method: 'GET'
    }

    return fetch(
      `/api/collections/${bookId}/epub?destination=folder&converter=wax&style=epub.css`,
      opts
    ).then(
      res => res.json().then(data => dispatch(htmlToEpubSuccess(data.path))),
      err => {
        dispatch(htmlToEpubFailure(err))
        throw err
      }
    )
  }
}
