import { fetch } from '../helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

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
    file: file
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
  return (dispatch, getState) => {
    dispatch(fileUploadRequest())

    const {currentUser: {token}} = getState()

    const data = new FormData()
    data.append('file', file)

    let config = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: data
    }

    return fetch(API_ENDPOINT + '/upload', config)
      .then(
        response => response.text()
      ).then(
        file => dispatch(fileUploadSuccess(file)),
        err => dispatch(fileUploadFailure(err))
      )
  }
}
