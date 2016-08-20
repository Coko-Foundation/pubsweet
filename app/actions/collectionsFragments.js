import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config'
import * as T from './types'

// utilities

const fragmentUrl = (collection, fragment) => {
  return `${API_ENDPOINT}/collections/${collection.id}/fragments/${fragment.id}`
}

const collectionUrl = (collection, suffix) => {
  let url = `${API_ENDPOINT}/collections`

  if (collection) url += `/${collection.id}`

  if (suffix) url += `/${suffix}`

  return url
}

// Listing collections

function getCollectionsRequest () {
  return {
    type: T.GET_COLLECTIONS_REQUEST
  }
}

function getCollectionsFailure (error) {
  return {
    type: T.GET_COLLECTIONS_FAILURE,
    error: error
  }
}

function getCollectionsSuccess (collections) {
  return {
    type: T.GET_COLLECTIONS_SUCCESS,
    collections: collections,
    receivedAt: Date.now()
  }
}

export function getCollections () {
  return dispatch => {
    dispatch(getCollectionsRequest())

    const url = collectionUrl()

    return fetch(url)
      .then(response => response.json())
      .then(collections => {
        dispatch(getCollectionsSuccess(collections))
      })
      .catch(err => {
        dispatch(getCollectionsFailure(err))
        console.log('Error', err)
      })
  }
}

// Actions on fragments

function getFragmentsRequest (collection) {
  return {
    type: T.GET_FRAGMENTS_REQUEST,
    collection: collection
  }
}

function getFragmentsSuccess (collection, fragments) {
  return {
    type: T.GET_FRAGMENTS_SUCCESS,
    collection: collection,
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

export function getFragments (collection) {
  return (dispatch, getState) => {
    dispatch(getFragmentsRequest())
    const {
      auth: { token }
    } = getState()

    const url = collectionUrl(collection, 'fragments')
    const opts = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    return fetch(url, opts)
      .then(response =>
        response.json()
          .then(fragments => ({ fragments, response }))
      ).then(({ fragments, response }) => {
        if (response.ok) {
          return dispatch(getFragmentsSuccess(collection, fragments))
        } else {
          return Promise.reject(response)
        }
      })
      .catch(err => {
        dispatch(getFragmentsFailure(err.statusText))
        console.log('Error', err)
      })
  }
}

function createFragmentRequest (fragment) {
  return {
    type: T.CREATE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

function createFragmentSuccess (collection, fragment) {
  return {
    type: T.CREATE_FRAGMENT_SUCCESS,
    collection: collection,
    fragment: fragment
  }
}

function createFragmentFailure (fragment, error) {
  return {
    type: T.CREATE_FRAGMENT_FAILURE,
    isFetching: false,
    fragment: fragment,
    error: error
  }
}

export function createFragment (fragment, collection) {
  return (dispatch, getState) => {
    dispatch(createFragmentRequest(fragment))
    const { auth: { token } } = getState()

    const url = fragmentUrl(collection, fragment)
    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)
    }

    return fetch(url, opts)
      .then(response => {
        if (response.ok) {
          return response.json().then(response => {
            dispatch(createFragmentSuccess(collection, response))
          })
        } else {
          return response.json().then(response => {
            dispatch(createFragmentFailure(fragment, response.message))
            throw new Error(response.message)
          })
        }
      })
      .catch(err => console.error(err))
  }
}

function updateFragmentRequest (fragment) {
  return {
    type: T.UPDATE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

function updateFragmentSuccess (collection, fragment) {
  return {
    type: T.UPDATE_FRAGMENT_SUCCESS,
    collection: collection,
    fragment: fragment,
    receivedAt: Date.now()
  }
}

export function updateFragment (collection, fragment) {
  return (dispatch, getState) => {
    dispatch(updateFragmentRequest(fragment))

    const { auth: { token } } = getState()

    const url = fragmentUrl(collection, fragment)
    const opts = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)
    }

    return fetch(url, opts)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .then(fragment => dispatch(updateFragmentSuccess(collection, fragment)))
      .catch(err => console.log('Error', err))
  }
}

function deleteFragmentRequest (fragment) {
  return {
    type: T.DELETE_FRAGMENT_REQUEST,
    fragment: fragment,
    update: { deleted: true }
  }
}

function deleteFragmentSuccess (collection, fragment) {
  return {
    type: T.DELETE_FRAGMENT_SUCCESS,
    collection: collection,
    fragment: fragment
  }
}

function deleteFragmentFailure (fragment, error) {
  return {
    type: T.DELETE_FRAGMENT_FAILURE,
    fragment: fragment,
    update: { deleted: undefined },
    error: error
  }
}

export function deleteFragment (fragment, collection) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState()
    dispatch(deleteFragmentRequest(fragment))

    const url = fragmentUrl(collection, fragment)
    const opts = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)
    }

    return fetch(url, opts)
      .then(response => {
        if (response.ok) {
          return response.json().then(response => {
            dispatch(deleteFragmentSuccess(collection, fragment))
          })
        } else {
          return response.json().then(response => {
            dispatch(deleteFragmentFailure(fragment, response.message))
            throw new Error(response.message)
          })
        }
      })
  }
}
