'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const uuid = require('node-uuid')
const AclPouchDb = require('node_acl_pouchdb')
var acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))
const AuthorizationError = require('../errors/authorization_error')

class Model {
  constructor (properties) {
    this._id = Model.uuid()
    Object.assign(this, properties)
  }

  save (username) {
    console.log(this)
    if (this.owner) {
      console.log('Owner during save', this.owner)
    }
    // First get the document to get its latest revision
    return db.get(this._id).then(function (doc) {
      console.log('Found an existing version, this is an update of:', doc)
      return doc._rev
    }).then(function (_rev) {
      this._rev = _rev
      // Then update the document with the latest revision
      if (this._deleted) {
        return this._putWithAuthorization(username, 'delete')
      } else {
        return this._putWithAuthorization(username, 'update')
      }
    }.bind(this)).catch(function (error) {
      if (error && error.status === 404) {
        console.log('No existing object found, creating a new one:', error)
        // If it doesn't exist, create
        return this._putWithAuthorization(username, 'create')
      } else {
        console.log('Unhandled error', error)
        throw error
      }
    }.bind(this))
  }

  _putWithAuthorization (username, action) {
    if (!username) {
      return this._put()
    }
    return this.authorized(username, action).then(function (res) {
      console.log(action, this.type, this._id, 'and rev', this._rev)
      if (res) {
        return this._put()
      } else {
        throw new AuthorizationError(username + ' not allowed to', action)
      }
    }.bind(this))
  }

  _put () {
    return db.put(this).then(function (response) {
      return this
    }.bind(this))
  }

  delete (username) {
    this._deleted = true
    return this.save(username)
  }

  authorized (username, action) {
    return this.constructor.authorized(username, this, action)
  }

  updateProperties (newProperties) {
    console.log('Updating properties to', newProperties)
    // Should we screen/filter updates here?
    Object.assign(this, newProperties)
    return this
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
      console.log('Current model class', this)
      return new this(result)
    }.bind(this)).catch(function (err) {
      console.error(err)
      return err
    })
  }

  static authorized (username, data, action) {
    console.log('Authorizing user:', username)
    console.log('Authorizing data:', data)
    console.log('Authorizing action:', action)

    var resource = data.type + 's'
    acl.allowedPermissions(username, resource, function (err, permissions) {
      if (err) {
        console.log(err)
      }
      console.log('Permissions for user', username, resource, permissions)
    })

    acl.userRoles(username).then(function (roles) {
      console.log('Roles for user', username, roles)
    })

    // A user can delete or update owned objects and itself
    if (action === 'delete' || action === 'update') {
      if ((data.owner && username === data.owner) ||
          (data.type === 'user' && data.username === username)
        ) {
        return Promise.resolve(true)
      }
    }

    return acl.isAllowed(username, resource, action)
  }
}

module.exports = {
  db: db,
  Model: Model
}
