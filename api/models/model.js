'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const uuid = require('node-uuid')
const AclPouchDb = require('node_acl_pouchdb')
var acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))

class Model {
  constructor (properties) {
    this._id = Model.uuid()
    Object.assign(this, properties)
  }

  save () {
    console.log(this)
    return db.get(this._id).then(function (doc) {
      console.log('responses for save', doc)
      return doc._rev
    }).then(function (_rev) {
      this._rev = _rev
      return db.put(this).then(function (response) {
        return this
      }.bind(this))
    }.bind(this)).catch(function (error) {
      console.log(error)
      if (error.status === 404) {
        return db.put(this).then(function (response) {
          return this
        }.bind(this))
      }
    }.bind(this))
  }

  delete () {
    return db.get(this._id).then(function (result) {
      console.log('Deleting:', result)
      return db.remove(result)
    }).then(function (result) {
      console.log('Deleted:', result)
    })
  }

  authorized (user, action) {
    return acl.isAllowed(user, this._id, action, function (err, res) {
      if (res) {
        console.log('User', user, 'is allowed to', action, this.type, this._id)
        return res
      } else {
        console.error(err)
        return false
      }
    })
  }

  static uuid () {
    return uuid.v4()
  }

  static all () {
    return db.createIndex({
      index: {
        fields: ['type']
      }
    }).then(function (result) {
      console.log(result)
      return db.find({selector: {
        type: this.type
      }}).then(function (results) {
        return results.docs.map(function (result) {
          return new this(result)
        }.bind(this))
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.error(err)
    })
  }

  static findById (id) {
    // Idempotently create indexes in datastore
    return db.get(id).then(function (result) {
      console.log(result)
      return new Model(result)
    }).catch(function (err) {
      console.error(err)
      return err
    })
  }

  static authorized (user, data, action) {
    console.log('Authorizing user:', user)
    console.log('Authorizing data:', data)
    console.log('Authorizing action:', action)

    var resource = data.type + 's'
    acl.allowedPermissions(user, resource, function (err, permissions) {
      if (err) {
        console.log(err)
      }
      console.log('Permissions for user', user, resource, permissions)
    })

    acl.userRoles(user).then(function (roles) {
      console.log('Roles for user', user, roles)
    })

    return acl.isAllowed(user, resource, action)
  }
}

module.exports = {
  db: db,
  Model: Model
}
