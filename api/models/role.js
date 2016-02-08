'use strict'

const db = require('./model').db
const AclPouchDb = require('node_acl_pouchdb')
var acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))

class Role {
  constructor (properties) {
    this.type = 'role'
    this.name = properties.name
    this.resources = properties.resources
    this.permissions = properties.permissions || '*'
  }

  save () {
    return new Promise(function (resolve, reject) {
      acl.allow(this.name, this.resources, this.permissions, function (err) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log('Saving', this.type)
          resolve(this)
        }
      }.bind(this))
    }.bind(this))
  }

  addUser (user) {
    return acl.addUserRoles(user, this.name).catch(function (err) {
      console.error(err)
      throw err
    })
  }

  static addUserRoles (username, role) {
    return acl.addUserRoles(username, role).catch(function (err) {
      console.error(err)
      throw err
    })
  }

  static removeUserRoles (username, role) {
    return acl.removeUserRoles(username, role).catch(function (err) {
      console.error(err)
      throw err
    })
  }

  static findByName (name) {
    return acl.whatResources(name, function (resources) {
      return new this({
        name: name,
        resources: resources
      })
    })
  }
}

module.exports = Role
