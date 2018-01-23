import { POLLING_FAILURE, POLLING_REQUEST, POLLING_SUCCESS } from './types'

const initialState = {
  isPolling: false,
  error: undefined,
}

export default function polling(state = initialState, action) {
  switch (action.type) {
    case POLLING_REQUEST:
      return Object.assign({}, state, {
        isPolling: true,
        error: undefined,
      })

    case POLLING_SUCCESS:
      return Object.assign({}, state, {
        isPolling: false,
        error: undefined,
      })

    case POLLING_FAILURE:
      return Object.assign({}, state, {
        isPolling: false,
        error: action.error,
      })

    default:
      return state
  }
}
