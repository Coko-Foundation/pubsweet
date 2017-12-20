import * as api from '../helpers/api'
import * as T from './types'

const collectionUrl = (collection, suffix) => {
  let url = '/collections'

  if (collection) url += `/${collection.id}`

  if (suffix) url += `/${suffix}`

  return url
}

function getCollectionsRequest() {
  return {
    type: T.GET_COLLECTIONS_REQUEST,
  }
}

function getCollectionsFailure(error) {
  return {
    type: T.GET_COLLECTIONS_FAILURE,
    error,
  }
}

function getCollectionsSuccess(collections) {
  return {
    type: T.GET_COLLECTIONS_SUCCESS,
    collections,
    receivedAt: Date.now(),
  }
}

export function getCollections(options) {
  return dispatch => {
    dispatch(getCollectionsRequest())

    let url = collectionUrl()

    if (options && options.fields) {
      url += `?fields=${encodeURIComponent(options.fields.join(','))}`
    }

    return api
      .get(url)
      .then(
        collections => dispatch(getCollectionsSuccess(collections)),
        err => dispatch(getCollectionsFailure(err)),
      )
  }
}

function getCollectionTeamsRequest() {
  return {
    type: T.GET_COLLECTION_TEAMS_REQUEST,
  }
}

function getCollectionTeamsFailure(error) {
  return {
    type: T.GET_COLLECTION_TEAMS_FAILURE,
    error,
  }
}

function getCollectionTeamsSuccess(teams) {
  return {
    type: T.GET_COLLECTION_TEAMS_SUCCESS,
    teams,
    receivedAt: Date.now(),
  }
}

export function getCollectionTeams(collection) {
  return dispatch => {
    dispatch(getCollectionTeamsRequest())

    const url = collectionUrl(collection, 'teams')

    return api
      .get(url)
      .then(
        teams => dispatch(getCollectionTeamsSuccess(teams)),
        err => dispatch(getCollectionTeamsFailure(err)),
      )
  }
}

function createCollectionRequest(collection) {
  return {
    type: T.CREATE_COLLECTION_REQUEST,
    collection,
  }
}

function createCollectionSuccess(collection) {
  return {
    type: T.CREATE_COLLECTION_SUCCESS,
    collection,
  }
}

function createCollectionFailure(collection, error) {
  return {
    type: T.CREATE_COLLECTION_FAILURE,
    isFetching: false,
    collection,
    error,
  }
}

export function createCollection(collection) {
  return dispatch => {
    dispatch(createCollectionRequest(collection))

    const url = collectionUrl()

    return api
      .create(url, collection)
      .then(
        collection => dispatch(createCollectionSuccess(collection)),
        err => dispatch(createCollectionFailure(collection, err)),
      )
  }
}

function getCollectionRequest(collection) {
  return {
    type: T.GET_COLLECTION_REQUEST,
    collection,
  }
}

function getCollectionSuccess(collection) {
  return {
    type: T.GET_COLLECTION_SUCCESS,
    collection,
    receivedAt: Date.now(),
  }
}

function getCollectionFailure(collection, error) {
  return {
    type: T.GET_COLLECTION_FAILURE,
    isFetching: false,
    collection,
    error,
  }
}

export function getCollection(collection) {
  return dispatch => {
    dispatch(getCollectionRequest(collection))

    const url = collectionUrl(collection)

    return api
      .get(url)
      .then(
        collection => dispatch(getCollectionSuccess(collection)),
        err => dispatch(getCollectionFailure(collection, err)),
      )
  }
}

function updateCollectionRequest(collection) {
  return {
    type: T.UPDATE_COLLECTION_REQUEST,
    collection,
  }
}

function updateCollectionSuccess(collection, update) {
  return {
    type: T.UPDATE_COLLECTION_SUCCESS,
    collection,
    update,
    receivedAt: Date.now(),
  }
}

function updateCollectionFailure(collection, error) {
  return {
    type: T.UPDATE_COLLECTION_FAILURE,
    isFetching: false,
    collection,
    error,
  }
}

export function updateCollection(collection) {
  return dispatch => {
    dispatch(updateCollectionRequest(collection))

    const url = collectionUrl(collection)

    return api
      .update(url, collection)
      .then(
        update => dispatch(updateCollectionSuccess(collection, update)),
        err => dispatch(updateCollectionFailure(collection, err)),
      )
  }
}

function deleteCollectionRequest(collection) {
  return {
    type: T.DELETE_COLLECTION_REQUEST,
    collection,
    update: { deleted: true },
  }
}

function deleteCollectionSuccess(collection) {
  return {
    type: T.DELETE_COLLECTION_SUCCESS,
    collection,
  }
}

function deleteCollectionFailure(collection, error) {
  return {
    type: T.DELETE_COLLECTION_FAILURE,
    collection,
    update: { deleted: undefined },
    error,
  }
}

export function deleteCollection(collection) {
  return dispatch => {
    dispatch(deleteCollectionRequest(collection))

    const url = collectionUrl(collection)

    return api
      .remove(url)
      .then(
        () => dispatch(deleteCollectionSuccess(collection)),
        err => dispatch(deleteCollectionFailure(collection, err)),
      )
  }
}
