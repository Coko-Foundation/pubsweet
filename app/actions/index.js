import fetch from 'isomorphic-fetch'

// Actions on collection

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION'
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION'

export function requestCollection () {
  return {
    type: REQUEST_COLLECTION
  }
}

export function receiveCollection (collection) {
  return {
    type: RECEIVE_COLLECTION,
    collection: collection,
    receivedAt: Date.now()
  }
}

export function fetchCollection () {
  return dispatch => {
    dispatch(requestCollection())
    return fetch('http://localhost:3000/api/collection')
      .then(response => response.json())
      .then(collection => dispatch(receiveCollection(collection)))
  }
}

// Actions on fragments

export const REQUEST_FRAGMENTS = 'REQUEST_FRAGMENTS'
export const RECEIVE_FRAGMENTS = 'RECEIVE_FRAGMENTS'

export function requestFragments () {
  return {
    type: REQUEST_FRAGMENTS
  }
}

export function fetchFragments () {
  return dispatch => {
    dispatch(requestCollection())
    return fetch('http://localhost:3000/api/collection/fragments')
      .then(response => response.json())
      .then(fragments => dispatch(receiveFragments(fragments)))
  }
}
export function receiveFragments (fragments) {
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
    return fetch('http://localhost:3000/api/collection/fragment', {
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
    return fetch('http://localhost:3000/api/collection/fragment', {
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
    return fetch('http://localhost:3000/api/collection/fragment', {
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

export const HYDRATE = 'HYDRATE'

export function hydrate () {
  return dispatch => {
    dispatch(fetchCollection())
    dispatch(fetchFragments())
  }
}
