import fetch from 'isomorphic-fetch'

// Actions on collection

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION'
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION'

export function requestCollection () {
  return {
    type: REQUEST_COLLECTION
  }
}

export function receiveCollection (json) {
  return {
    type: RECEIVE_COLLECTION,
    json: json,
    receivedAt: Date.now()
  }
}

export function fetchCollection () {
  return dispatch => {
    dispatch(requestCollection())
    return fetch('http://localhost:3000/api/collection')
      .then(response => response.json())
      .then(json => dispatch(receiveCollection(json)))
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

export function receiveFragments (json) {
  return {
    type: RECEIVE_FRAGMENTS,
    json: json,
    receivedAt: Date.now()
  }
}

export function fetchFragments () {
  return dispatch => {
    dispatch(requestCollection())
    return fetch('http://localhost:3000/api/collection/fragments')
      .then(response => response.json())
      .then(json => dispatch(receiveFragments(json)))
  }
}

export const SEND_FRAGMENT_UPDATE = 'SEND_FRAGMENT_UPDATE'
export const COMPLETE_FRAGMENT_UPDATE = 'COMPLETE_FRAGMENT_UPDATE'

export const START_CREATE_FRAGMENT = 'START_CREATE_FRAGMENT'
export const FINISH_CREATE_FRAGMENT = 'FINISH_CREATE_FRAGMENT'

export function startCreateFragment (fragment) {
  return {
    type: START_CREATE_FRAGMENT,
    fragment: fragment
  }
}

export function finishCreateFragment (fragment) {
  return {
    type: FINISH_CREATE_FRAGMENT,
    fragment: fragment,
    receivedAt: Date.now()
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
      .then(json => dispatch(receiveFragments(json)))
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
