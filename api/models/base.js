'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const uuid = require('node-uuid')

class Base {
  constructor (properties) {
    Object.assign(this, properties)
    this._id = Base.uuid()
  }

  save () {
    return db.put(this).then(function (response) {
      return this
    }.bind(this))
  }

  delete () {
    return db.get(this.id).then(function (result) {
      console.log('Deleting:', result)
      return db.remove(result)
    }).then(function (result) {
      console.log('Deleted: ', result)
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
      return new Base(result)
    }).catch(function (err) {
      console.error(err)
      return err
    })
  }
}

module.exports = {
  db: db,
  Base: Base
}
