import {
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAILURE,
  CREATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_SUCCESS,
  PATCH_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_SUCCESS,
  DELETE_FRAGMENT_SUCCESS
} from '../actions/types'

import _ from 'lodash'

export function collections (state = [], action) {
  const collections = _.clone(state)

  // TODO: store entities as an object or immutable Map, with the id as the key
  function getCollection () {
    return _.find(collections, { id: action.collection.id })
  }

  function getCollectionIndex () {
    return _.findIndex(collections, {id: action.collection.id})
  }

  function addCollection () {
    collections.push(action.collection)

    return collections
  }

  function updateCollection () {
    collections[getCollectionIndex()] = action.collection

    return collections
  }

  function deleteCollection () {
    const collection = getCollection()

    return _.without(collections, collection)
  }

  function addFragments () {
    const collection = getCollection()

    let toadd = (action.fragments || [action.fragment]).map(fragment => fragment.id)

    collection.fragments = _.union(collection.fragments, toadd)
    return collections
  }

  function removeFragments () {
    const collection = getCollection()

    const todel = (action.fragments || [action.fragment]).map(fragment => fragment.id)
    collection.fragments = _.difference(collection.fragments, todel)
    return collections
  }

  switch (action.type) {
    case GET_COLLECTIONS_SUCCESS:
      return _.clone(action.collections)

    case GET_COLLECTIONS_FAILURE:
      return []

    case CREATE_COLLECTION_SUCCESS:
      return addCollection()

    case UPDATE_COLLECTION_SUCCESS:
    case PATCH_COLLECTION_SUCCESS:
      return updateCollection()

    case DELETE_COLLECTION_SUCCESS:
      return deleteCollection()

    case DELETE_FRAGMENT_SUCCESS:
      return removeFragments()

    case GET_FRAGMENTS_SUCCESS:
    case CREATE_FRAGMENT_SUCCESS:
      return addFragments()
  }

  return state
}
