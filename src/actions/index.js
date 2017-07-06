import componentActions from '../components/actions'
import * as T from './types'

const actions = {}

// Resets the currently visible error message.
actions.resetErrorMessage = () => ({
  type: T.RESET_ERROR_MESSAGE
})

import * as currentUser from './currentUser'
Object.assign(actions, currentUser)

import * as collections from './collections'
Object.assign(actions, collections)

import * as fragments from './fragments'
Object.assign(actions, fragments)

import * as users from './users'
Object.assign(actions, users)

import * as teams from './teams'
Object.assign(actions, teams)

import * as fileUpload from './fileUpload'
Object.assign(actions, fileUpload)

// Actions from external components
componentActions.forEach(
  componentActions => Object.assign(actions, componentActions)
)

// Hydrate hydrates the store from a persistent store, the backend.
// It gets collections, fragments and user data (via token).
actions.hydrate = () => dispatch => Promise.all([
  dispatch(currentUser.getCurrentUser()),
  dispatch(collections.getCollections())
])

export default actions
