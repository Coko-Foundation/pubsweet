import { FILE_UPLOAD_REQUEST, FILE_UPLOAD_SUCCESS } from '../actions/types'

export default function(
  state = {
    isFetching: false,
  },
  action,
) {
  switch (action.type) {
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        file: action.file,
      }
    case FILE_UPLOAD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    default:
      return state
  }
}
