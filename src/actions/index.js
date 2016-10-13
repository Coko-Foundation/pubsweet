import * as T from './types'

const actions = {}

// Resets the currently visible error message.
actions.resetErrorMessage = () => {
  return {
    type: T.RESET_ERROR_MESSAGE
  }
}

// Actions for current user
import { loginUser, logoutUser, getUser, signupUser } from './current_user'

Object.assign(actions, { loginUser, logoutUser, getUser, signupUser })

// Actions for collections and fragments
import {
  getCollections, getFragments, createFragment, updateFragment, deleteFragment
} from './collectionsFragments.js'

Object.assign(actions, {
  getCollections, getFragments, createFragment, updateFragment, deleteFragment
})

// Actions for users management
import { getUsers, updateUser } from './users'

Object.assign(actions, { getUsers, updateUser })

// Actions for teams management
import { getTeams, createTeam, updateTeam, deleteTeam } from './teams'

Object.assign(actions, { getTeams, createTeam, updateTeam, deleteTeam })

// Actions from external components
require('../components/actions').forEach(
  componentActions => Object.assign(actions, componentActions)
)

// Hydrate hydrates the store from a persistent store, the backend.
// It gets collections, fragments and user data (via token).
actions.hydrate = () => {
  return dispatch => Promise.all([
    dispatch(getUser()),
    dispatch(getCollections())
  ])
}

module.exports = actions
