import * as T from './types'
import componentActionsList from '../components/actions'

const actions = {}

// Resets the currently visible error message.
actions.resetErrorMessage = () => {
  return {
    type: T.RESET_ERROR_MESSAGE
  }
}

// Actions for current user
import { getUser } from './current_user'

Object.assign(actions, { getUser })

// Actions for collections
import { getCollections, createCollection, updateCollection, patchCollection, deleteCollection } from './collections'

Object.assign(actions, { getCollections, createCollection, updateCollection, patchCollection, deleteCollection })

// Actions for fragments
import { getFragments, createFragment, updateFragment, deleteFragment } from './fragments'

Object.assign(actions, { getFragments, createFragment, updateFragment, deleteFragment })

// Actions for users management
import { getUsers, updateUser } from './users'

Object.assign(actions, { getUsers, updateUser })

// Actions for teams management
import { getTeams, createTeam, updateTeam, deleteTeam } from './teams'

Object.assign(actions, { getTeams, createTeam, updateTeam, deleteTeam })

// Actions for file upload
import { fileUpload } from './fileUpload'

Object.assign(actions, { fileUpload })

// Actions from external components
componentActionsList.forEach(
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

export default actions
