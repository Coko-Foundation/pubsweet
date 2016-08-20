// Updates error message to notify about the failed fetches.
export function error (state = null, action) {
  const { error } = action

  if (error) {
    return error
  } else {
    return null
  }
}

import { collections } from './collections'
import { fragments } from './fragments'
import auth from './auth'
import users from './users'
import teams from './teams'

export { collections as collections }
export { fragments as fragments }
export { auth as auth }
export { users as users }
export { teams as teams }

