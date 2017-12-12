import {
  SIGNUP_SUCCESS
} from './types'

export default function userSignup (state = {
  isFetching: false,
  isAuthenticated: false
}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true,
        user: action.user
      })
    default:
      return state
  }
}
