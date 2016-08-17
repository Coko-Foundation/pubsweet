import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config.js'
import * as T from './types'

// Actions on collection

function getCollectionRequest () {
  return {
    type: T.GET_COLLECTION_REQUEST
  }
}

function getCollectionSuccess (collection) {
  return {
    type: T.GET_COLLECTION_SUCCESS,
    collection: collection,
    receivedAt: Date.now()
  }
}

export function getCollection () {
  return dispatch => {
    dispatch(getCollectionRequest())
    return fetch(API_ENDPOINT + '/collections/1')
      .then(response => response.json())
      .then(collection => dispatch(getCollectionSuccess(collection)))
  }
}

// Actions on fragments
function getFragmentsRequest () {
  return {
    type: T.GET_FRAGMENTS_REQUEST
  }
}

function getFragmentsSuccess (fragments) {
  return {
    type: T.GET_FRAGMENTS_SUCCESS,
    fragments: fragments,
    receivedAt: Date.now()
  }
}

function getFragmentsFailure (error) {
  return {
    type: T.GET_FRAGMENTS_FAILURE,
    error: error
  }
}

export function getFragments () {
  return (dispatch, getState) => {
    dispatch(getFragmentsRequest())
    const { auth: { token } } = getState()

    return fetch(API_ENDPOINT + '/collections/1/fragments', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response =>
      response.json().then(fragments => ({ fragments, response }))
    ).then(({ fragments, response }) => {
      if (response.ok) {
        return dispatch(getFragmentsSuccess(fragments))
      } else {
        return Promise.reject(response)
      }
    })
    .catch(err => {
      dispatch(getFragmentsFailure(err))
      console.log('Error', err)
    })
  }
}

export function createFragmentRequest (fragment) {
  return {
    type: T.CREATE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

export function createFragmentSuccess (fragment) {
  return {
    type: T.CREATE_FRAGMENT_SUCCESS,
    fragment: fragment
  }
}

export function createFragmentFailure (message) {
  return {
    type: T.CREATE_FRAGMENT_FAILURE,
    isFetching: false,
    error: message
  }
}

export function createFragment (fragment) {
  return (dispatch, getState) => {
    dispatch(createFragmentRequest(fragment))
    const { auth: { token } } = getState()

    return fetch(API_ENDPOINT + '/collections/1/fragments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)})
      .then(response => {
        if (response.ok) {
          return response.json().then(response => {
            dispatch(createFragmentSuccess(response))
          })
        } else {
          return response.json().then(response => {
            dispatch(createFragmentFailure(response.message))
            throw new Error(response.message)
          })
        }
      })
      .catch(err => console.error(err))
  }
}

export function updateFragmentRequest (fragment) {
  return {
    type: T.UPDATE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

export function updateFragment (fragment) {
  return (dispatch, getState) => {
    dispatch(updateFragmentRequest(fragment))
    const { auth: { token } } = getState()

    return fetch(API_ENDPOINT + '/collections/1/fragments/' + fragment.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)})
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .then(fragment => dispatch(updateFragmentSuccess(fragment)))
      .catch(err => console.log('Error', err))
  }
}

export function updateFragmentSuccess (fragment) {
  return {
    type: T.UPDATE_FRAGMENT_SUCCESS,
    fragment: fragment,
    receivedAt: Date.now()
  }
}

export function deleteFragmentRequest (fragment) {
  return {
    type: T.DELETE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

export function deleteFragmentSuccess (fragment) {
  return {
    type: T.DELETE_FRAGMENT_SUCCESS,
    fragment: fragment
  }
}

export function deleteFragmentFailure (message, fragmentId) {
  return {
    id: fragmentId,
    type: T.DELETE_FRAGMENT_FAILURE,
    error: message
  }
}

export function deleteFragment (fragment) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch(deleteFragmentRequest(fragment))

    return fetch(API_ENDPOINT + '/collections/1/fragments/' + fragment.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)})
      .then(response => {
        if (response.ok) {
          return response.json().then(response => {
            dispatch(deleteFragmentSuccess(response))
          })
        } else {
          return response.json().then(response => {
            dispatch(deleteFragmentFailure(response.message, fragment.id))
            throw new Error(response.message)
          })
        }
      })
  }
}

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: T.RESET_ERROR_MESSAGE
  }
}

function getDebugInfoSuccess (debugs) {
  return {
    type: T.GET_DEBUG_INFO_SUCCESS,
    debugs: debugs
  }
}

export function getDebugInfo (fragment) {
  return (dispatch, getState) => {
    return fetch(API_ENDPOINT + '/debug')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .then(debugs => dispatch(getDebugInfoSuccess(debugs)))
      .catch(err => console.log('Error', err))
  }
}

// Actions for auth
import { getUser } from './auth'
export { loginUser, logoutUser, getUser, signupUser } from './auth'

// Actions for users management
export { getUsers, updateUser } from './users'

// Hydrate hydrates the store from a persistent store, the backend.
// It gets collections, fragments and user data (via token).
export function hydrate () {
  return dispatch => Promise.all([
    dispatch(getUser()),
    dispatch(getCollection()),
    dispatch(getFragments())
  ])
}

