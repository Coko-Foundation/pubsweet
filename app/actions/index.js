import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config.json'
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
    return fetch(API_ENDPOINT + '/collection')
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

export function getFragments () {
  return (dispatch, getState) => {
    dispatch(getFragmentsRequest())
    const { auth: { token } } = getState()

    return fetch(API_ENDPOINT + '/collection/fragments', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then(fragments => dispatch(getFragmentsSuccess(fragments)))
    .catch(err => console.log('Error', err))
  }
}

export function createFragmentRequest (fragment) {
  return {
    type: T.CREATE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

export function createFragment (fragment) {
  return (dispatch, getState) => {
    dispatch(createFragmentRequest(fragment))
    const { auth: { token } } = getState()

    return fetch(API_ENDPOINT + '/collection/fragments', {
      method: 'POST',
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
      .then(fragment => dispatch(createFragmentSuccess(fragment)))
      .catch(err => console.log('Error', err))
  }
}

export function createFragmentSuccess (fragment) {
  return {
    type: T.CREATE_FRAGMENT_SUCCESS,
    fragment: fragment,
    receivedAt: Date.now()
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

    return fetch(API_ENDPOINT + '/collection/fragments/' + fragment._id, {
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
    fragment: fragment,
    receivedAt: Date.now()
  }
}

export function deleteFragment (fragment) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch(deleteFragmentRequest(fragment))

    return fetch(API_ENDPOINT + '/collection/fragments/' + fragment._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)})
      .then(response => response.json())
      .then(fragment => dispatch(deleteFragmentSuccess(fragment)))
  }
}

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: T.RESET_ERROR_MESSAGE
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
  return dispatch => {
    dispatch(getUser())
    dispatch(getCollection())
    dispatch(getFragments())
  }
}

