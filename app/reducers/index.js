import { routerStateReducer } from 'redux-router'
import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'

const initialState = {
  collections: [{
    title: 'Something',
    author: 'Jure',
    fragments: [1, 2, 3]
  }],
  fragments: [
    {
      id: 1,
      title: 'one',
      source: 'hello'
    },
    {
      id: 2,
      title: 'two',
      source: 'hellohi'
    },
    {
      id: 3,
      title: 'three',
      source: 'hellothere'
    }
  ]
}

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

function reducer (state = initialState, action) {
  // For now, don’t handle any actions
  // and just return the state given to us.
  return state
}

const rootReducer = combineReducers({
  reducer,
  errorMessage,
  routerStateReducer
})

export default rootReducer
