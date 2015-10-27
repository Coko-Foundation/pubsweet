import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'
import _ from 'lodash'

const initialCollections = [{
  title: 'Something',
  author: 'Jure',
  fragments: [1, 2, 3]
}]

const initialFragments = [
  {
    id: 1,
    title: 'one',
    source: 'hello',
    status: 'published'
  },
  {
    id: 2,
    title: 'two',
    source: 'hellohi',
    status: 'unpublished'
  },
  {
    id: 3,
    title: 'three',
    source: 'hellothere',
    status: 'published'
  }
]

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
  return state
}

function fragments (state = initialFragments, action) {
  let fragments = _.clone(initialFragments)
  switch (action.type) {
    case ActionTypes.START_CREATE_FRAGMENT:
      fragments.push(action.fragment)
      return fragments
    case ActionTypes.FINISH_CREATE_FRAGMENT:
      return fragments
  }
  return state
}

const rootReducer = combineReducers({
  collections,
  fragments,
  errorMessage,
  router
})

export default rootReducer
