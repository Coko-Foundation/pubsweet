import * as api from '../helpers/api'
import * as T from './types'

function getCurrentUserRequest() {
  return {
    type: T.GET_CURRENT_USER_REQUEST,
  }
}

function getCurrentUserSuccess(user) {
  return {
    type: T.GET_CURRENT_USER_SUCCESS,
    user,
  }
}

function getCurrentUserFailure(error) {
  return {
    type: T.GET_CURRENT_USER_FAILURE,
    error,
  }
}

export function getCurrentUser() {
  return dispatch => {
    dispatch(getCurrentUserRequest())

    return api
      .get('/users/authenticate')
      .then(user => dispatch(getCurrentUserSuccess(user)))
      .catch(err => dispatch(getCurrentUserFailure(err)))
  }
}

export function ensureCurrentUser() {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    if (!currentUser.isFetching && !currentUser.isFetched) {
      return dispatch(getCurrentUser())
    }
    return Promise.resolve()
  }
}
