'use strict'

const schema = require('./schema')
const uuid = require('node-uuid')
const NotFoundError = require('../errors/NotFoundError')

schema()

class Model {
  constructor (properties) {
    schema()
    this.id = Model.uuid()
    Object.assign(this, properties)
  }

  save () {
    console.log('Saving', this, this.id)
    return this.constructor.find(this.id).then(function (result) {
      console.log('Found an existing version, this is an update of:', result)
      return result.rev
    }).then(function (rev) {
      this.rev = rev
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
    return this.constructor.find(this.id).then(function (object) {
      return db.rel.del(this.type, object)
    }.bind(this)).then(function () {
      console.log('Deleted', this.type, this.id)
      return this
    }.bind(this))
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
        return results[this.type + 's']
      }.bind(this)).catch(function (err) {
        console.error(err)
      })
  }

  // Find by id e.g.
  // User.find('394')
  static find (id, options) {
    let plural = this.type + 's'
    return db.rel.find(this.type, id).then(function (results) {
      if (results[plural].length === 0) {
        throw new NotFoundError()
      } else {
        return new this(results[plural][0])
      }
    }.bind(this)).catch(function (err) {
      if (err.name === 'NotFoundError') {
        console.log('Object not found', err)
      }
      throw err
    })
  }

  static findByField (field, value) {
    console.log('Finding', field, value)
    field = 'data.' + field
    let type = 'data.type'

    return db.createIndex({
      index: {
        fields: [field, type]
      }
    }).then(function (result) {
      var selector = {selector: {}}
      selector.selector[type] = this.type
      selector.selector[field] = value
      return db.find(selector)
    }.bind(this)).then(results => {
      if (results.docs.length === 0) {
        throw new NotFoundError()
      } else {
        return results.docs.map(result => {
          let id = db.rel.parseDocID(result._id).id
          let foundObject = result.data
          foundObject.id = id
          foundObject.rev = result._rev
          return new this(foundObject)
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
