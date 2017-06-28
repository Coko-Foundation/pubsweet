import { fetch } from '../helpers/Utils'
import * as T from './types'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

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

export function getCollections (options) {
  return dispatch => {
    dispatch(getCollectionsRequest())

    let url = collectionUrl()

    if (options && options.fields) {
      url += '?fields=' + encodeURIComponent(options.fields.join(','))
    }

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

function getCollectionRequest (collection) {
  return {
    type: T.GET_COLLECTION_REQUEST,
    collection: collection
  }
}

function getCollectionSuccess (collection, get) {
  return {
    type: T.GET_COLLECTION_SUCCESS,
    collection: collection,
    receivedAt: Date.now()
  }
}

function getCollectionFailure (collection, error) {
  return {
    type: T.GET_COLLECTION_FAILURE,
    isFetching: false,
    collection: collection,
    error: error
  }
}

export function getCollection (collection) {
  return (dispatch, getState) => {
    const {currentUser: {token}} = getState()

    dispatch(getCollectionRequest(collection))

    const url = collectionUrl(collection)

    const opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    return fetch(url, opts).then(
      collection => dispatch(getCollectionSuccess(collection)),
      err => dispatch(getCollectionFailure(collection, err))
    )
  }
}

function updateCollectionRequest (collection) {
  return {
    type: T.UPDATE_COLLECTION_REQUEST,
    collection: collection
  }
}

function updateCollectionSuccess (collection, update) {
  return {
    type: T.UPDATE_COLLECTION_SUCCESS,
    collection: collection,
    update: update,
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
      method: 'PATCH',
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
        update => dispatch(updateCollectionSuccess(collection, update)),
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
