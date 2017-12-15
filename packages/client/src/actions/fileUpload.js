import request from '../helpers/api'
import * as T from './types'

function fileUploadRequest() {
  return {
    type: T.FILE_UPLOAD_REQUEST,
    isFetching: true,
  }
}

function fileUploadSuccess(file) {
  return {
    type: T.FILE_UPLOAD_SUCCESS,
    isFetching: false,
    file,
  }
}

function fileUploadFailure(message) {
  return {
    type: T.FILE_UPLOAD_FAILURE,
    isFetching: false,
    error: message,
  }
}

export function fileUpload(file) {
  return dispatch => {
    dispatch(fileUploadRequest())

    const data = new FormData()
    data.append('file', file)

    const opts = {
      method: 'POST',
      headers: {
        Accept: 'text/plain', // the response is a URL
        // TODO: set the Location header of the response instead
      },
      body: data,
    }

    return request('/upload', opts).then(
      file => dispatch(fileUploadSuccess(file)),
      err => dispatch(fileUploadFailure(err)),
    )
  }
}
