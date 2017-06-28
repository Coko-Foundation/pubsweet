import {
  GET_CURRENT_USER_REQUEST, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILURE
} from '../actions/types'

import { LOGOUT_SUCCESS } from 'pubsweet-component-login/types'

const token = require('../helpers/authtoken')

export default function (state = {
  isFetching: false,
  isAuthenticated: false,
  token: token()
}, action) {
  switch (action.type) {
    case GET_CURRENT_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })

    case GET_CURRENT_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.user.token
      })

    case GET_CURRENT_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })

    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        token: null
      }

    default:
      return state
  }
}
