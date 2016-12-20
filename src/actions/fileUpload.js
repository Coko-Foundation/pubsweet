import { fetch } from '../helpers/Utils'

const API_ENDPOINT = CONFIG['pubsweet-backend'].API_ENDPOINT
import * as T from './types'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

function fileUploadRequest () {
  return {
    type: T.FILE_UPLOAD_REQUEST,
    isFetching: true
  }
}

function fileUploadSuccess (file) {
  return {
    type: T.FILE_UPLOAD_SUCCESS,
    isFetching: false,
    file: file,
  }
}

function fileUploadFailure (message) {
  return {
    type: T.FILE_UPLOAD_FAILURE,
    isFetching: false,
    error: message
  }
}

export function fileUpload (file) {
  var data = new FormData()
  data.append('file', file)

  let config = {
    method: 'POST',
    body: data
  }

  return dispatch => {
    dispatch(fileUploadRequest())
    return fetch(API_ENDPOINT + '/upload', config)
      .then(
        response => response.text()
      ).then(
        file => dispatch(fileUploadSuccess(file)),
        err => dispatch(fileUploadFailure(err))
      )
  }
}
