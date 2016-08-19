import {
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_FAILURE,
  // GET_FRAGMENTS_FAILURE,
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_REQUEST,
  CREATE_FRAGMENT_SUCCESS,
  CREATE_FRAGMENT_FAILURE,
  UPDATE_FRAGMENT_REQUEST,
  UPDATE_FRAGMENT_SUCCESS,
  DELETE_FRAGMENT_REQUEST,
  DELETE_FRAGMENT_FAILURE,
  DELETE_FRAGMENT_SUCCESS,
  // RESET_ERROR_MESSAGE,
  GET_DEBUG_INFO_SUCCESS
} from '../actions/types'

import _ from 'lodash'

// Updates error message to notify about the failed fetches.
export function error (state = null, action) {
  const { error } = action

  if (error) {
    return error
  } else {
    return null
  }
}

export function collections (state = [], action) {
  const collections = _.clone(state)

  function getCollection () {
    return _.find(collections, { id: action.collection.id })
  }

  function addFragments () {
    const collection = getCollection()

    const toadd = action.fragments || [action.fragment]
    collection.fragments = _.union(collection.fragments, toadd)
    return collections
  }

  function removeFragments () {
    const collection = getCollection()

    const todel = action.fragments || [action.fragment]
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
  return state
}

export function fragments (state = {}, action) {
  const fragments = _.clone(state)

  function replaceAll () {
    _.unset(fragments, action.collection.fragments)
    action.fragments.forEach((fragment) => {
      fragments[fragment.id] = fragment
    })
    return fragments
  }

  function updateOne () {
    const oldfragment = fragments[action.fragment.id] || {}
    const update = action.update || action.fragment

    const newfragment = _.assign(oldfragment, update)
    fragments[action.fragment.id] = newfragment

    return fragments
  }

  function removeOne () {
    _.unset(fragments, action.fragment.id)
    return fragments
  }

  // choose the sword, and you will join me
  // choose the ball, and you join your mother... in death
  // you don't understand my words, but you must choose
  // 拝 一刀 | Ogami Ittō
  switch (action.type) {
    case CREATE_FRAGMENT_SUCCESS:
    case UPDATE_FRAGMENT_REQUEST:
    case UPDATE_FRAGMENT_SUCCESS:
    case DELETE_FRAGMENT_REQUEST:
    case DELETE_FRAGMENT_FAILURE:
    case CREATE_FRAGMENT_REQUEST: return updateOne()
    case CREATE_FRAGMENT_FAILURE:
    case DELETE_FRAGMENT_SUCCESS: return removeOne()
    case GET_FRAGMENTS_SUCCESS: return replaceAll()
  }

  return state
}

export function debug (state = [], action) {
  switch (action.type) {
    case GET_DEBUG_INFO_SUCCESS:
      return action.debugs
  }
  return state
}

import auth from './auth'
import users from './users'

export { auth as auth }
export { users as users }
