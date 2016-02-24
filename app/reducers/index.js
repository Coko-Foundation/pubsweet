import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import {
  // GET_COLLECTION_REQUEST,
  GET_COLLECTION_SUCCESS,
  // GET_COLLECTION_FAILURE,
  // GET_FRAGMENTS_REQUEST,
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_REQUEST,
  CREATE_FRAGMENT_SUCCESS,
  UPDATE_FRAGMENT_REQUEST,
  UPDATE_FRAGMENT_SUCCESS,
  DELETE_FRAGMENT_REQUEST,
  // DELETE_FRAGMENT_SUCCESS,
  RESET_ERROR_MESSAGE
} from '../actions/types'

import auth from './auth'
import users from './users'

import _ from 'lodash'

const initialCollections = []
const initialFragments = []

// Updates error message to notify about the failed fetches.
function errorMessage (state = null, action) {
  const { type, error } = action

  if (type === RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

function collections (state = initialCollections, action) {
  let collections = _.clone(state)
  switch (action.type) {
    case GET_COLLECTION_SUCCESS:
      collections = [action.collection]
      return collections
  }
  return state
}

function fragments (state = initialFragments, action) {
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
      fragments[lastIndex] = Object.assign(fragments[lastIndex], {
        _id: action.fragment._id,
        _rev: action.fragment._rev
      })
      return fragments
    case UPDATE_FRAGMENT_REQUEST:
      let index = _.findIndex(fragments, function (f) {
        return f._id === action.fragment._id
      })
      fragments[index] = action.fragment
      return fragments
    case UPDATE_FRAGMENT_SUCCESS:
      index = _.findIndex(fragments, function (f) {
        return f._id === action.fragment._id
      })
      fragments[index]._rev = action.fragment._rev
      return fragments
    case DELETE_FRAGMENT_REQUEST:
      fragments = _.without(fragments, action.fragment)
      return fragments
  }
  return state
}

const rootReducer = combineReducers({
  collections,
  fragments,
  users,
  errorMessage,
  router,
  auth
})

export default rootReducer
