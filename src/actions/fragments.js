import { fetch } from '../helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

export const fragmentUrl = (collection, fragment) => {
  let url = `${API_ENDPOINT}/collections/${collection.id}/fragments`

  if (fragment.id) url += `/${fragment.id}`

  return url
}

export const collectionUrl = (collection, suffix) => {
  let url = `${API_ENDPOINT}/collections`

  if (collection) url += `/${collection.id}`

  if (suffix) url += `/${suffix}`

  return url
}

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
    dispatch(getFragmentsRequest(collection))
    const {
      currentUser: { token }
    } = getState()

    const url = collectionUrl(collection, 'fragments')
    const opts = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    return fetch(url, opts).then(
        response => response.json()
      ).then(
        fragments => dispatch(getFragmentsSuccess(collection, fragments)),
        err => dispatch(getFragmentsFailure(err))
      )
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

export function createFragment (collection, fragment) {
  return (dispatch, getState) => {
    dispatch(createFragmentRequest(fragment))
    const { currentUser: { token } } = getState()

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
      .then(
        response => response.json()
      ).then(
        fragment => dispatch(createFragmentSuccess(collection, fragment)),
        err => dispatch(createFragmentFailure(fragment, err))
      )
  }
}

function updateFragmentRequest (fragment) {
  return {
    type: T.UPDATE_FRAGMENT_REQUEST,
    fragment: fragment
  }
}

function updateFragmentSuccess (fragment, update) {
  return {
    type: T.UPDATE_FRAGMENT_SUCCESS,
    fragment: fragment,
    update: update,
    receivedAt: Date.now()
  }
}

function updateFragmentFailure (fragment, error) {
  return {
    type: T.UPDATE_FRAGMENT_FAILURE,
    isFetching: false,
    fragment: fragment,
    error: error
  }
}

export function updateFragment (collection, fragment) {
  return (dispatch, getState) => {
    dispatch(updateFragmentRequest(fragment))

    const { currentUser: { token } } = getState()

    const url = fragmentUrl(collection, fragment)
    const opts = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fragment)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        update => dispatch(updateFragmentSuccess(fragment, update)),
        err => dispatch(updateFragmentFailure(fragment, err))
      )
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

export function deleteFragment (collection, fragment) {
  return (dispatch, getState) => {
    const { currentUser: { token } } = getState()
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
      .then(
        response => response.json()
      ).then(
        json => dispatch(deleteFragmentSuccess(collection, fragment)),
        err => dispatch(deleteFragmentFailure(fragment, err))
      )
  }
}
