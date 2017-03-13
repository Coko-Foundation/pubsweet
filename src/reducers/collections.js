import {
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAILURE,
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_SUCCESS,
  DELETE_FRAGMENT_SUCCESS
} from '../actions/types'

import find from 'lodash/find'
import union from 'lodash/union'
import difference from 'lodash/difference'
import clone from 'lodash/clone'

export function collections (state = [], action) {
  const collections = clone(state)

  function getCollection () {
    return find(collections, { id: action.collection.id })
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
    case GET_COLLECTIONS_SUCCESS: return clone(action.collections)
    case GET_COLLECTIONS_FAILURE: return []
    case DELETE_FRAGMENT_SUCCESS: return removeFragments()
    case GET_FRAGMENTS_SUCCESS:
    case CREATE_FRAGMENT_SUCCESS: return addFragments()
  }
  return state
}
