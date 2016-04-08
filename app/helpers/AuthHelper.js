'use strict'

import { includes } from 'lodash'

class AuthHelper {
  constructor (properties) {

  }

  showForUser (user, object, action = '*') {
    if (includes(user.roles, 'admin')) {
      return true
    } else if (includes(user.roles, 'contributor')) {
      return false
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
