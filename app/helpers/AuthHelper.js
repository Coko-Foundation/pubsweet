'use strict'

import { includes } from 'lodash'

class AuthHelper {
  constructor (properties) {

  }

  static showForUser (user, object, action = '*') {
    var allowed
    if (includes(user.roles, 'admin')) {
      allowed = AuthHelper.roles['admin'][object]
      if (allowed && (allowed === '*' || includes(allowed, action))) {
        return true
      } else {
        return false
      }
    } else if (includes(user.roles, 'contributor')) {
      allowed = AuthHelper.roles['contributor'][object]
      if (allowed && (allowed === '*' || includes(allowed, action))) {
        return true
      } else {
        return false
      }
    }
  }
}

// This description should come from the API eventually
AuthHelper.roles = {
  admin: {
    users: '*',
    collection: '*',
    fragments: '*'
  }, contributor: {
    fragments: ['create']
  }
}

export default AuthHelper
