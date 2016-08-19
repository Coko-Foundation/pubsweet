import {
  // GET_COLLECTION_REQUEST,
  GET_COLLECTION_SUCCESS,
  // GET_COLLECTION_FAILURE,
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

const initialCollections = []
const initialFragments = []

// Updates error message to notify about the failed fetches.
export function error (state = null, action) {
  const { error } = action

  if (error) {
    return error
  } else {
    return null
  }
}

export function collections (state = initialCollections, action) {
  let collections = _.clone(state)
  switch (action.type) {
    case GET_COLLECTION_SUCCESS:
      collections = [action.collection]
      return collections
  }
  return state
}

export function fragments (state = initialFragments, action) {
  let fragments = _.clone(state)
  switch (action.type) {
    case GET_FRAGMENTS_SUCCESS:
      fragments = action.fragments
      return fragments
    case CREATE_FRAGMENT_REQUEST:
      fragments.push(action.fragment)
      return fragments
    case CREATE_FRAGMENT_SUCCESS:
      let lastIndex = fragments.length - 1
      fragments[lastIndex] = Object.assign(fragments[lastIndex], action.fragment)
      return fragments
    case CREATE_FRAGMENT_FAILURE:
      fragments.pop()
      return fragments
    case UPDATE_FRAGMENT_REQUEST:
      let index = _.findIndex(fragments, function (f) {
        return f.id === action.fragment.id
      })
      fragments[index] = action.fragment
      return fragments
    case UPDATE_FRAGMENT_SUCCESS:
      index = _.findIndex(fragments, function (f) {
        return f.id === action.fragment.id
      })
      fragments[index]._rev = action.fragment._rev
      return fragments
    case DELETE_FRAGMENT_REQUEST:
      index = _.findIndex(fragments, function (f) {
        return f.id === action.fragment.id
      })
      fragments[index].deleted = true
      return fragments
    case DELETE_FRAGMENT_FAILURE:
      index = _.findIndex(fragments, function (f) {
        return f.id === action.id
      })
      fragments[index].deleted = undefined
      return fragments
    case DELETE_FRAGMENT_SUCCESS:
      index = _.findIndex(fragments, function (f) {
        return f.id === action.fragment.id
      })
      fragments = _.without(fragments, fragments[index])
      return fragments
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
import teams from './teams'

export { auth as auth }
export { users as users }
export { teams as teams }
