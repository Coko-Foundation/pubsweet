'use strict'

import { includes } from 'lodash'

class AuthHelper {
  constructor (properties) {

  }

  static _actionAllowed (action, permissions, object, user) {
    if (permissions && permissions === '*') {
      return true
    } else if (typeof permissions === 'object') {
      var actionPermission = permissions[action]
      if (typeof actionPermission === 'function') {
        return actionPermission(object, user)
      } else {
        return actionPermission
      }
    }
  }

  static _type (object) {
    if (typeof object === 'string') {
      return object
    } else {
      return object.type + 's'
    }
  }

  static showForUser (user, object, action = '*') {
    var permissions
    if (includes(user.roles, 'admin')) {
      permissions = AuthHelper.roles['admin'][this._type(object)]
      return this._actionAllowed(action, permissions, object, user)
    } else if (includes(user.roles, 'contributor')) {
      permissions = AuthHelper.roles['contributor'][this._type(object)]
      return this._actionAllowed(action, permissions, object, user)
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
    fragments: {
      create: true,
      edit: function (fragment, user) {
        return fragment.owner === user.username
      },
      delete: function (fragment, user) {
        return fragment.owner === user.username
      }
    }
  }
}

export default AuthHelper
