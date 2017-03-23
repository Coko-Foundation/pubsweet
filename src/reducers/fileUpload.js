import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
} from '../actions/types'

export function fileUpload (state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case FILE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        file: action.file
      })
    case FILE_UPLOAD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}
