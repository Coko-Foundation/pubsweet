import { INK_FAILURE, INK_REQUEST, INK_SUCCESS } from './types'

const initialState = {
  isFetching: false,
  converted: null,
  error: null
}

export default function ink (state = initialState, action) {
  switch (action.type) {
    case INK_REQUEST:
      return {
        isFetching: true,
        converted: null,
        error: null
      }

    case INK_SUCCESS:
      return {
        isFetching: false,
        converted: action.converted,
        error: null
      }

    case INK_FAILURE:
      return {
        isFetching: false,
        converted: null,
        error: action.error
      }

    default:
      return state
  }
}
