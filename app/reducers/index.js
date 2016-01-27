import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import { authStateReducer as auth } from 'redux-auth'
import * as ActionTypes from '../actions'
import _ from 'lodash'

const initialCollections = []
const initialFragments = []

// Updates error message to notify about the failed fetches.
function errorMessage (state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

function collections (state = initialCollections, action) {
  let collections = _.clone(state)
  switch (action.type) {
    case ActionTypes.RECEIVE_COLLECTION:
      collections = [action.collection]
      return collections
  }
  return state
}

function fragments (state = initialFragments, action) {
  let fragments = _.clone(state)
  switch (action.type) {
    case ActionTypes.RECEIVE_FRAGMENTS:
      fragments = action.fragments
      return fragments
    case ActionTypes.START_CREATE_FRAGMENT:
      fragments.push(action.fragment)
      return fragments
    case ActionTypes.FINISH_CREATE_FRAGMENT:
      let lastIndex = fragments.length - 1
      fragments[lastIndex] = Object.assign(fragments[lastIndex], {
        _id: action.fragment.id,
        _rev: action.fragment.rev
      })
      return fragments
    case ActionTypes.START_UPDATE_FRAGMENT:
      let index = _.findIndex(fragments, function (f) {
        return f._id === action.fragment._id
      })
      fragments[index] = action.fragment
      return fragments
    case ActionTypes.FINISH_UPDATE_FRAGMENT:
      index = _.findIndex(fragments, function (f) {
        return f._id === action.fragment.id
      })
      fragments[index]._rev = action.fragment.rev
      return fragments
    case ActionTypes.START_DELETE_FRAGMENT:
      fragments = _.without(fragments, action.fragment)
      return fragments
  }
  return state
}

const rootReducer = combineReducers({
  collections,
  fragments,
  errorMessage,
  router,
  auth
})

export default rootReducer
