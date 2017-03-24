import {
  INK_REQUEST, INK_SUCCESS, INK_FAILURE
} from './types'

export default function ink (state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case INK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case INK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        converted: action.converted,
      })
    case INK_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
