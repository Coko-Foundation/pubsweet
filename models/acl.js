'use strict'
const db = require('./base').db

const AclPouchDb = require('node_acl_pouchdb')
var acl = new AclPouchDb(new AclDb.pouchdbBackend(db, 'acl'))

class Acl {
  constructor (properties) {
  }

  static createRole (role, resource) {

  }

  static addUserToRole (user, role) {

  }
}

module.exports = Acl
