'use strict'

const User = require('./user')
const Fragment = require('./fragment')
const Collection = require('./collection')

const AuthorizationError = require('../errors/AuthorizationError')

class Authorize {
  constructor (properties) {

  }

  // Check if permissions exist in a globals scope
  // e.g. admin can delete all /api/users
  static _global (username, resource, action) {
    console.log('_global', username, resource, action)
    return acl.isAllowed(username, resource, action).then(function (res) {
      if (res) {
        return true
      } else {
        throw new AuthorizationError(username +
          ' is not allowed to ' +
          action + ' ' + resource
        )
      }
    })
  }

  // Check if permissions exist in a local scope, for a single
  // thing, e.g. contributor can edit fragment
  static _local (username, thing, model, id, action) {
    console.log('_local', username, model, id, action)
    var resource
    var Model
    switch (model) {
      case 'collection':
        Model = Collection
        break
      case 'fragments':
        Model = Fragment
        break
      case 'users':
        Model = User
        break
    }

    return Model.find(id).then(function (thing) {
      resource = thing
      // A user can delete or update owned objects and itself
      if ((thing.owner && username === thing.owner) ||
          (thing.type === 'user' && thing.username === username)
        ) {
        return true
      } else {
        return false
      }
    }).then(function (owner) {
      if (owner) {
        return resource
      } else {
        if (model === 'fragments') {
          return this._global(username, '/api/collection/fragments', action)
        } else {
          return this._global(username, '/api/' + model, action)
        }
      }
    }.bind(this)).then(function (res) {
      if (res) {
        return resource
      } else {
        throw new AuthorizationError(username +
          ' is not allowed to ' +
          action + ' ' + thing
        )
      }
    })
  }

  // Checks for permissions and resolves with the thing asked about,
  // if it makes sense (for reading, updating, deleting single objects)

  static it (username, thing, action) {
    console.log('Finding out if', username, 'can', action, thing)

    // Debug
    acl.allowedPermissions(username, thing, function (err, permissions) {
      if (err) {
        console.log(err)
      }
      console.log('Permissions for user', username, thing, permissions)
    })

    acl.userRoles(username).then(function (roles) {
      console.log('Roles for user', username, roles)
    })
    // End debug

    if (action === 'delete' || action === 'update' || action === 'read') {
      var id = thing.split('/')[3]
      if (id === 'fragments') {
        var model = id
        id = false
      } else {
        model = thing.split('/')[2]
      }

      if (!id && model) {
        return this._global(username, thing, action)
      } else {
        return this._local(username, thing, model, id, action)
      }
    } else {
      return this._global(username, thing, action)
    }
  }
}

module.exports = Authorize
