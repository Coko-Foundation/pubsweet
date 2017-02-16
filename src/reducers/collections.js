import {
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAILURE,
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_SUCCESS,
  DELETE_FRAGMENT_SUCCESS
} from '../actions/types'

import _ from 'lodash'

export function collections (state = [], action) {
  const collections = _.clone(state)

  function getCollection () {
    return _.find(collections, { id: action.collection.id })
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
    case GET_COLLECTIONS_SUCCESS: return _.clone(action.collections)
    case GET_COLLECTIONS_FAILURE: return []
    case DELETE_FRAGMENT_SUCCESS: return removeFragments()
    case GET_FRAGMENTS_SUCCESS:
    case CREATE_FRAGMENT_SUCCESS: return addFragments()
  }

  console.log('RETURNING STATE', state)
  return state
}
