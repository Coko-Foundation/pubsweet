import * as api from '../helpers/api'
import * as T from './types'

const collectionUrl = (collection, suffix) => {
  let url = '/collections'

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

    return api.get(url).then(
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
  return (dispatch) => {
    dispatch(createCollectionRequest(collection))

    const url = collectionUrl()

    return api.create(url, collection).then(
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

function getCollectionSuccess (collection) {
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
      response => response.json()
    ).then(
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
  return (dispatch) => {
    dispatch(updateCollectionRequest(collection))

    const url = collectionUrl(collection)

    return api.update(url, collection).then(
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
  return (dispatch) => {
    dispatch(deleteCollectionRequest(collection))

    const url = collectionUrl(collection)

    return api.remove(url).then(
      () => dispatch(deleteCollectionSuccess(collection)),
      err => dispatch(deleteCollectionFailure(collection, err))
    )
  }
}
