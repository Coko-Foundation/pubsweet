import * as T from './types'

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: T.RESET_ERROR_MESSAGE
  }
}

// Actions for current user
import { getUser } from './current_user'
export { loginUser, logoutUser, getUser, signupUser } from './current_user'

// Actions for collections and fragments
import { getCollections } from './collectionsFragments.js'
export { getCollections, getFragments, createFragment, updateFragment, deleteFragment } from './collectionsFragments.js'

// Actions for users management
export { getUsers, updateUser } from './users'

// Actions for teams management
export { getTeams, createTeam, updateTeam, deleteTeam } from './teams'

// Hydrate hydrates the store from a persistent store, the backend.
// It gets collections, fragments and user data (via token).
export function hydrate () {
  return dispatch => Promise.all([
    dispatch(getUser()),
    dispatch(getCollections())
  ])
}
