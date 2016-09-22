// Updates error message to notify about the failed fetches.
export function error (state = null, action) {
  const { error } = action

  if (error) {
    console.log(error)
    return error.message
  } else {
    return null
  }
}

import { collections } from './collections'
import { fragments } from './fragments'
import currentUser from './current_user'
import users from './users'
import teams from './teams'

export { collections as collections }
export { fragments as fragments }
export { currentUser as currentUser }
export { users as users }
export { teams as teams }

