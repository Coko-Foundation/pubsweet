import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config.json'
// Actions on collection

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION'
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION'

function requestCollection () {
  return {
    type: REQUEST_COLLECTION
  }
}

function receiveCollection (collection) {
  return {
    type: RECEIVE_COLLECTION,
    collection: collection,
    receivedAt: Date.now()
  }
}

export function fetchCollection () {
  return dispatch => {
    dispatch(requestCollection())
    return fetch(API_ENDPOINT + '/collection')
      .then(response => response.json())
      .then(collection => dispatch(receiveCollection(collection)))
  }
}

// Actions on fragments

export const REQUEST_FRAGMENTS = 'REQUEST_FRAGMENTS'
export const RECEIVE_FRAGMENTS = 'RECEIVE_FRAGMENTS'

function requestFragments () {
  return {
    type: REQUEST_FRAGMENTS
  }
}

export function fetchFragments () {
  return dispatch => {
    dispatch(requestFragments())
    return fetch(API_ENDPOINT + '/collection/fragments')
      .then(response => response.json())
      .then(fragments => dispatch(receiveFragments(fragments)))
  }
}

function receiveFragments (fragments) {
  return {
    type: RECEIVE_FRAGMENTS,
    fragments: fragments,
    receivedAt: Date.now()
  }
}

export const START_CREATE_FRAGMENT = 'START_CREATE_FRAGMENT'
export const FINISH_CREATE_FRAGMENT = 'FINISH_CREATE_FRAGMENT'

export function startCreateFragment (fragment) {
  return {
    type: START_CREATE_FRAGMENT,
    fragment: fragment
  }
}

export function createFragment (fragment) {
  return dispatch => {
    dispatch(startCreateFragment(fragment))
    return fetch(API_ENDPOINT + '/collection/fragment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fragment)})
      .then(response => response.json())
      .then(fragment => dispatch(finishCreateFragment(fragment)))
  }
}

export function finishCreateFragment (fragment) {
  return {
    type: FINISH_CREATE_FRAGMENT,
    fragment: fragment,
    receivedAt: Date.now()
  }
}

export const START_UPDATE_FRAGMENT = 'START_UPDATE_FRAGMENT'
export const FINISH_UPDATE_FRAGMENT = 'FINISH_UPDATE_FRAGMENT'

export function startUpdateFragment (fragment) {
  return {
    type: START_UPDATE_FRAGMENT,
    fragment: fragment
  }
}

export function updateFragment (fragment) {
  return dispatch => {
    dispatch(startUpdateFragment(fragment))
    return fetch(API_ENDPOINT + '/collection/fragment', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fragment)})
      .then(response => response.json())
      .then(fragment => dispatch(finishUpdateFragment(fragment)))
  }
}

export function finishUpdateFragment (fragment) {
  return {
    type: FINISH_UPDATE_FRAGMENT,
    fragment: fragment,
    receivedAt: Date.now()
  }
}

export const START_DELETE_FRAGMENT = 'START_DELETE_FRAGMENT'
export const FINISH_DELETE_FRAGMENT = 'FINISH_DELETE_FRAGMENT'

export function startDeleteFragment (fragment) {
  return {
    type: START_DELETE_FRAGMENT,
    fragment: fragment
  }
}

export function deleteFragment (fragment) {
  return dispatch => {
    dispatch(startDeleteFragment(fragment))
    return fetch(API_ENDPOINT + '/collection/fragment', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fragment)})
      .then(response => response.json())
      .then(fragment => dispatch(finishDeleteFragment(fragment)))
  }
}

export function finishDeleteFragment (fragment) {
  return {
    type: FINISH_DELETE_FRAGMENT,
    fragment: fragment,
    receivedAt: Date.now()
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

// Actions for auth
import { fetchUser } from './auth'
export { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, USER_SUCCESS, LOGOUT_SUCCESS, loginUser, logoutUser, fetchUser } from './auth'

// Hydrate hydrates the store from a persistent store, the backend.
// It gets collections, fragments and user data (via token).

export const HYDRATE = 'HYDRATE'
export function hydrate () {
  return dispatch => {
    dispatch(fetchCollection())
    dispatch(fetchFragments())
    dispatch(fetchUser())
  }
}

