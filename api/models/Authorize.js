'use strict'

const User = require('./User')
const Fragment = require('./Fragment')
const Collection = require('./Collection')

const AuthorizationError = require('../errors/AuthorizationError')

class Authorize {
  constructor (properties) {

  }

  // Check if permissions exist in a global scope
  // e.g. admin can delete all /api/users
  static _global (userId, resource, action) {
    console.log('_global', userId, resource, action)
    return acl.isAllowed(userId, resource, action).then(function (res) {
      if (res) {
        console.log(userId, 'is allowed to', action, resource)
        return true
      } else {
        throw new AuthorizationError(userId +
          ' is not allowed to ' +
          action + ' ' + resource
        )
      }
    })
  }

  // Check if permissions exist in a local scope, for a single
  // thing, e.g. contributor can edit fragment
  static _local (userId, thing, model, id, action) {
    console.log('_local', userId, thing, model, id, action)
    var resource
    var Model
    switch (model) {
      case 'collection':
        Model = Collection
        break
      case 'collection/fragments':
        Model = Fragment
        break
      case 'users':
        Model = User
        break
    }

    return Model.find(id).then(function (thing) {
      resource = thing
      // A user can delete or update owned objects and itself
      if ((thing.owner && userId === thing.owner) ||
          (thing.type === 'user' && thing.userId === userId)
        ) {
        return true
      } else {
        return false
      }
    }).then(function (owner) {
      if (owner) {
        return resource
      } else {
        if (model === 'collection/fragments') {
          return this._global(userId, '/api/collection/fragments', action)
        } else {
          return this._global(userId, '/api/' + model, action)
        }
      }
    }.bind(this)).then(function (res) {
      if (res) {
        return resource
      } else {
        throw new AuthorizationError(userId +
          ' is not allowed to ' +
          action + ' ' + thing
        )
      }
    })
  }

  // Checks for permissions and resolves with the thing asked about,
  // if it makes sense (for reading, updating, deleting single objects)
  static it (userId, thing, action) {
    if (!userId) {
      return Promise.reject(new AuthorizationError())
    }

    console.log('Finding out if', userId, 'can', action, thing)
    // Debug
    // acl.allowedPermissions(userId, thing, function (err, permissions) {
    //   if (err) {
    //     console.log(err)
    //   }
    //   console.log('Permissions for user', userId, thing, permissions)
    // })

    // acl.userRoles(userId).then(function (roles) {
    //   console.log('Roles for user', userId, roles)
    // })
    // End debug

    if (action === 'delete' || action === 'update' || action === 'read') {
      var splitted = thing.split('/')
      var id = splitted[3] // e.g. /api/users/1

      if (id === 'fragments') { // e.g. /api/collection/fragments/1
        var model = 'collection/fragments'
        id = splitted[4]
      } else {
        model = splitted[2]
      }

      if (!id && model) {
        return this._global(userId, '/api/' + model, action)
      } else {
        return this._local(userId, thing, model, id, action)
      }
    } else {
      return this._global(userId, thing, action)
    }
  }
}

module.exports = Authorize
