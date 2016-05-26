'use strict'

// const _ = require('lodash')
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('relational-pouch'))

global.db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const AclPouchDb = require('node_acl_pouchdb')
global.acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))

const uuid = require('node-uuid')
const NotFoundError = require('../errors/NotFoundError')

class Model {
  constructor (properties) {
    db.setSchema([
      {
        singular: 'collection',
        plural: 'collections',
        relations: {
          fragments: {hasMany: 'fragment'},
          user: {belongsTo: 'user'}
        }
      },
      {
        singular: 'fragment',
        plural: 'fragments',
        relations: {
          collection: {belongsTo: 'collection'},
          user: {belongsTo: 'user'}
        }
      },
      {
        singular: 'user',
        plural: 'users',
        relations: {
          collections: {hasMany: 'collection'},
          fragments: {hasMany: 'fragment'},
          roles: {hasMany: 'roles'}
        }
      },
      {
        singular: 'role',
        plural: 'roles',
        relations: {
          users: {hasMany: 'users'}
        }
      }
    ])

    this._id = Model.uuid()
    Object.assign(this, properties)
  }

  save () {
    return db.rel.find(this.constructor.type, this._id).then(function (results) {
      console.log(results)
      let object = results[this.constructor.type + 's'][0]
      console.log('Found an existing version, this is an update of:', object)
      return object._rev
    }.bind(this)).then(function (_rev) {
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
    return db.rel.save(this.constructor.type, this).then(function (response) {
      console.log('Actually _put', this)
      return this
    }.bind(this))
  }

  delete () {
    this._deleted = true
    return this.save()
  }

  updateProperties (properties) {
    console.log('Updating properties to', properties)
    // TODO: Should we screen/filter updates here?
    Object.assign(this, properties)
    return this
  }

  static uuid () {
    return uuid.v4()
  }

  // Find all of a certain type e.g.
  // User.all()
  static all (options) {
    options = options || {}
    return db.rel.find(this.type)
      .then(function (results) {
        return results
      }).catch(function (err) {
        console.error(err)
      })
  }

  // Find by id e.g.
  // User.find('394')
  static find (id, options) {
    options = options || {}
    return db.rel.find(this.type, id).then(function (result) {
      console.log(result)
      result = new this(result)
      return result
    }).catch(function (err) {
      if (err.name === 'not_found') {
        console.log('Object not found', err)
      }
      throw err
    })
  }

  static findByField (field, value) {
    console.log('Finding', field, value)
    return db.createIndex({
      index: {
        fields: [field, 'type']
      }
    }).then(function (result) {
      var selector = {selector: {
        type: this.type
      }}
      selector.selector[field] = value
      return db.find(selector)
    }.bind(this)).then(results => {
      if (results.docs.length === 0) {
        throw new NotFoundError()
      } else {
        return results.docs.map(result => {
          return new this(result)
        })
      }
    }).catch(function (err) {
      if (err.name !== 'NotFoundError') {
        console.error('Error', err)
        throw err
      } else {
        throw err
      }
    })
  }
}

module.exports = Model
