import find from 'lodash/find'
import union from 'lodash/union'
import difference from 'lodash/difference'
import clone from 'lodash/clone'
import findIndex from 'lodash/findIndex'
import without from 'lodash/without'

import {
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAILURE,
  CREATE_COLLECTION_SUCCESS,
  GET_COLLECTION_REQUEST,
  GET_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_SUCCESS,
  PATCH_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_SUCCESS,
  DELETE_FRAGMENT_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types'

export default function(state = [], action) {
  const collections = clone(state)

  // TODO: store entities as an object or immutable Map, with the id as the key
  function getCollection() {
    return find(collections, { id: action.collection.id })
  }

  function getCollectionIndex() {
    return findIndex(collections, { id: action.collection.id })
  }

  function addCollection() {
    // only add the collection if it hasn't already been added
    if (!getCollection()) {
      collections.push(action.collection)
    }

    return collections
  }

  function setCollection() {
    const index = getCollectionIndex()

    // NOTE: this is necessary because the collections state is an array
    if (index === -1) {
      collections.push(action.collection)
    } else {
      collections[index] = action.collection
    }

    return collections
  }

  function updateCollection() {
    const index = getCollectionIndex()

    collections[index] = { ...collections[index], ...action.update }

    return collections
  }

  function deleteCollection() {
    const collection = getCollection()

    return without(collections, collection)
  }

  function addFragments() {
    if (action.collection) {
      const collection = getCollection()

      if (collection) {
        collection.fragments = union(
          collection.fragments,
          (action.fragments || [action.fragment]).map(fragment => fragment.id),
        )
      }
    }

    return collections
  }

  function removeFragments() {
    if (action.collection) {
      const collection = getCollection()

      if (collection) {
        collection.fragments = difference(
          collection.fragments,
          (action.fragments || [action.fragment]).map(fragment => fragment.id),
        )
      }
    }

    return collections
  }

  switch (action.type) {
    case GET_COLLECTIONS_SUCCESS:
      return clone(action.collections)

    case GET_COLLECTIONS_FAILURE:
      return []

    case CREATE_COLLECTION_SUCCESS:
      return addCollection()

    case GET_COLLECTION_SUCCESS:
      return setCollection()

    case UPDATE_COLLECTION_SUCCESS:
    case PATCH_COLLECTION_SUCCESS:
      return updateCollection()

    case GET_COLLECTION_REQUEST:
    case DELETE_COLLECTION_SUCCESS:
      return deleteCollection()

    case DELETE_FRAGMENT_SUCCESS:
      return removeFragments()

    case GET_FRAGMENTS_SUCCESS:
    case CREATE_FRAGMENT_SUCCESS:
      return addFragments()

    case LOGOUT_SUCCESS:
      return []

    default:
      return state
  }
}
