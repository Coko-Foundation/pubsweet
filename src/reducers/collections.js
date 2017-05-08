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

import find from 'lodash/find'
import union from 'lodash/union'
import difference from 'lodash/difference'
import clone from 'lodash/clone'
import findIndex from 'lodash/findIndex'
import without from 'lodash/without'

export default function (state = [], action) {
  const collections = clone(state)

  // TODO: store entities as an object or immutable Map, with the id as the key
  function getCollection () {
    return find(collections, { id: action.collection.id })
  }

  function getCollectionIndex () {
    return findIndex(collections, {id: action.collection.id})
  }

  function addCollection () {
    // only add the collection if it hasn't already been added
    if (!getCollection()) {
      collections.push(action.collection)
    }

    return collections
  }

  function updateCollection () {
    const index = getCollectionIndex()

    collections[index] = Object.assign(collections[index], action.update)

    return collections
  }

  function deleteCollection () {
    const collection = getCollection()

    return without(collections, collection)
  }

  function addFragments () {
    const collection = getCollection()

    if (!collection) return

    let toadd = (action.fragments || [action.fragment]).map(fragment => fragment.id)

    collection.fragments = union(collection.fragments, toadd)
    return collections
  }

  function removeFragments () {
    const collection = getCollection()

    if (!collection) return

    const todel = (action.fragments || [action.fragment]).map(fragment => fragment.id)
    collection.fragments = difference(collection.fragments, todel)
    return collections
  }

  switch (action.type) {
    case GET_COLLECTIONS_SUCCESS:
      return clone(action.collections)

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
