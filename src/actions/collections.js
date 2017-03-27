import { fetch } from '../helpers/Utils'
const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT
import * as T from './types'

const collectionUrl = (collection, suffix) => {
  let url = `${API_ENDPOINT}/collections`

  if (collection) url += `/${collection.id}`

  if (suffix) url += `/${suffix}`

  return url
}

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

    return fetch(url).then(
        response => response.json()
      ).then(
        collections => dispatch(getCollectionsSuccess(collections)),
        err => dispatch(getCollectionsFailure(err))
      )
  }
}

function createCollectionRequest (collection) {
  return {
    type: T.CREATE_COLLECTION_REQUEST,
    collection: collection
  }
}

function createCollectionSuccess (collection) {
  return {
    type: T.CREATE_COLLECTION_SUCCESS,
    collection: collection
  }
}

function createCollectionFailure (collection, error) {
  return {
    type: T.CREATE_COLLECTION_FAILURE,
    isFetching: false,
    collection: collection,
    error: error
  }
}

export function createCollection (collection) {
  return (dispatch, getState) => {
    dispatch(createCollectionRequest(collection))
    const {currentUser: {token}} = getState()

    const url = collectionUrl()
    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(collection)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        collection => dispatch(createCollectionSuccess(collection)),
        err => dispatch(createCollectionFailure(collection, err))
      )
  }
}

function patchCollectionRequest (collection) {
  return {
    type: T.PATCH_COLLECTION_REQUEST,
    collection: collection
  }
}

function patchCollectionSuccess (collection) {
  return {
    type: T.PATCH_COLLECTION_SUCCESS,
    collection: collection,
    receivedAt: Date.now()
  }
}

function patchCollectionFailure (collection, error) {
  return {
    type: T.PATCH_COLLECTION_FAILURE,
    isFetching: false,
    collection: collection,
    error: error
  }
}

export function patchCollection (collection, values) {
  return (dispatch, getState) => {
    dispatch(patchCollectionRequest(collection))

    const {currentUser: {token}} = getState()

    const url = collectionUrl(collection)
    const opts = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(values)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        collection => dispatch(patchCollectionSuccess(collection)),
        err => dispatch(patchCollectionFailure(collection, err))
      )
  }
}

function updateCollectionRequest (collection) {
  return {
    type: T.UPDATE_COLLECTION_REQUEST,
    collection: collection
  }
}

function updateCollectionSuccess (collection) {
  return {
    type: T.UPDATE_COLLECTION_SUCCESS,
    collection: collection,
    receivedAt: Date.now()
  }
}

function updateCollectionFailure (collection, error) {
  return {
    type: T.UPDATE_COLLECTION_FAILURE,
    isFetching: false,
    collection: collection,
    error: error
  }
}

export function updateCollection (collection) {
  return (dispatch, getState) => {
    dispatch(updateCollectionRequest(collection))

    const {currentUser: {token}} = getState()

    const url = collectionUrl(collection)
    const opts = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(collection)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        collection => dispatch(updateCollectionSuccess(collection)),
        err => dispatch(updateCollectionFailure(collection, err))
      )
  }
}

function deleteCollectionRequest (collection) {
  return {
    type: T.DELETE_COLLECTION_REQUEST,
    collection: collection,
    update: {deleted: true}
  }
}

function deleteCollectionSuccess (collection) {
  return {
    type: T.DELETE_COLLECTION_SUCCESS,
    collection: collection
  }
}

function deleteCollectionFailure (collection, error) {
  return {
    type: T.DELETE_COLLECTION_FAILURE,
    collection: collection,
    update: {deleted: undefined},
    error: error
  }
}

export function deleteCollection (collection) {
  return (dispatch, getState) => {
    const {currentUser: {token}} = getState()
    dispatch(deleteCollectionRequest(collection))

    const url = collectionUrl(collection)
    const opts = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        json => dispatch(deleteCollectionSuccess(collection)),
        err => dispatch(deleteCollectionFailure(collection, err))
      )
  }
}
