'use strict'

const Model = require('./model')

class Authorize {
  constructor (properties) {

  }

  static it (username, thing, action) {
    console.log('Authorizing', username, 'to', action, thing)

    var resource = thing.type + 's'
    acl.allowedPermissions(username, resource, function (err, permissions) {
      if (err) {
        console.log(err)
      }
      console.log('Permissions for user', username, resource, permissions)
    })

    acl.userRoles(username).then(function (roles) {
      console.log('Roles for user', username, roles)
    })

    if (action === 'delete' || action === 'update') {
    // A user can delete or update owned objects and itself
      if ((thing.owner && username === thing.owner) ||
          (thing.type === 'user' && thing.username === username)
        ) {
        return Promise.resolve(true)
      }
    }

    return acl.isAllowed(username, resource, action)
  }
}

module.exports = Authorize
