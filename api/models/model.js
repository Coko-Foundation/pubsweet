'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
global.db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const AclPouchDb = require('node_acl_pouchdb')
global.acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))

const uuid = require('node-uuid')
const AuthorizationError = require('../errors/authorization_error')

class Model {
  constructor (properties) {
    this._id = Model.uuid()
    Object.assign(this, properties)
  }

  save () {
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
      return this._put()
    }.bind(this)).catch(function (error) {
      if (error && error.status === 404) {
        console.log('No existing object found, creating a new one:', error)
        return this._put()
      } else {
        throw error
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

  static all (type) {
    type = type || this.type
    return db.createIndex({
      index: {
        fields: ['type']
      }
    }).then(function (result) {
      console.log(result)
      return db.find({selector: {
        type: type
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
      return new this(result)
    }.bind(this)).catch(function (err) {
      console.error(err)
      return err
    })
  }
}

module.exports = Model
