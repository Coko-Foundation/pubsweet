import { RESET_ERROR_MESSAGE } from './types'

import * as collections from './collections'
import * as currentUser from './currentUser'
import * as fileUpload from './fileUpload'
import * as fragments from './fragments'
import * as teams from './teams'
import * as users from './users'

import componentActions from '../components/actions'

// Resets the currently visible error message.
const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})

// Hydrate hydrates the store from a persistent store, the backend.
// It gets collections, fragments and user data (via token).
const hydrate = () => dispatch =>
  Promise.all([
    dispatch(currentUser.getCurrentUser()),
    dispatch(collections.getCollections()),
  ])

export default {
  ...collections,
  ...currentUser,
  ...fileUpload,
  ...fragments,
  ...teams,
  ...users,
  ...componentActions,
  hydrate,
  resetErrorMessage,
}
