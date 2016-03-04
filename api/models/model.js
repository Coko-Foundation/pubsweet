'use strict'

const _ = require('lodash')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
global.db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const AclPouchDb = require('node_acl_pouchdb')
global.acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))

const uuid = require('node-uuid')
const NotFoundError = require('../errors/NotFoundError')

class Model {
  constructor (properties) {
    this._id = Model.uuid()
    Object.assign(this, properties)
  }

  save () {
    console.log(this)
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
    // Don't save async properties as they are saved elsewhere
    if (this.constructor.relations) {
      this.constructor.relations.forEach(function (property) {
        delete this[property]
      }, this)
    }

    return db.put(this).then(function (response) {
      console.log('Actually _put', this)
      return this
    }.bind(this))
  }

  delete () {
    this._deleted = true
    return this.save()
  }

  authorized (username, action) {
    return this.constructor.authorized(username, this, action)
  }

  updateProperties (properties) {
    console.log('Updating properties to', properties)
    // Should we screen/filter updates here?
    Object.assign(this, properties)
    return this
  }

  static uuid () {
    return uuid.v4()
  }

  // Find all of a certain type e.g.
  // User.all()
  // User.all({include: ['roles']})
  static all (options) {
    options = options || {}
    return db.createIndex({
      index: {
        fields: ['type']
      }
    }).then(function (result) {
      console.log(result)
      return db.find({selector: {
        type: this.type
      }}).then(function (results) {
        var promises = results.docs.map(function (result) {
          // Hacky and not performant, what is a better way to do this?
          return this.find(result._id, options)
        }.bind(this))
        return Promise.all(promises)
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.error(err)
    })
  }

  // Find by id e.g.
  // User.find('394')
  // User.find('394', {include: ['roles']})
  static find (id, options) {
    options = options || {}
    return db.get(id).then(function (result) {
      console.log(result)
      result = new this(result)
      if (options.include) {
        var included = options.include.map(function (include) {
          return result[include]()
        })
        included.push(result)
        return Promise.all(included)
      } else {
        return result
      }
    }.bind(this)).then(function (final_result) {
      if (options.include) {
        var result = final_result.pop()
        _.each(options.include, function (value, index) {
          result[value] = final_result[index]
        })
        return result
      } else {
        return final_result
      }
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
    }.bind(this)).then(function (results) {
      if (results.docs.length === 0) {
        throw new NotFoundError()
      } else {
        return new this(results.docs[0])
      }
    }.bind(this)).catch(function (err) {
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
