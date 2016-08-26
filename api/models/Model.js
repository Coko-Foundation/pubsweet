'use strict'

const uuid = require('node-uuid')
const remove = require('lodash/remove')

const schema = require('./schema')
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')
const logger = require('../logger')
schema()

class Model {
  constructor (properties) {
    schema()
    this.id = Model.uuid()
    Object.assign(this, properties)
  }

  save () {
    logger.info('Saving', this.type, this.id)

    return this.constructor.find(this.id).then(function (result) {
      logger.info('Found an existing version, this is an update of:', result)
      return result.rev
    }).then(function (rev) {
      this.rev = rev
      return this._put()
    }.bind(this)).catch(function (error) {
      if (error && error.status === 404) {
        logger.info('No existing object found, creating a new one:', this.type, this.id)
        return this._put()
      } else {
        throw error
      }
    }.bind(this))
  }

  _put () {
    return db.rel.save(this.constructor.type, this).then(function (response) {
      logger.info('Actually _put', this.type, this.id, this)
      return this
    }.bind(this))
  }

  delete () {
    return this.constructor.find(this.id).then(function (object) {
      return db.rel.del(this.type, object)
    }.bind(this)).then(function () {
      logger.info('Deleted', this.type, this.id)
      return this
    }.bind(this))
  }

  updateProperties (properties) {
    logger.info('Updating properties to', properties)

    // These properties are modified through setters
    delete properties.owners
    // TODO: Should we screen/filter more properties here?

    Object.assign(this, properties)
    return this
  }

  setOwners (owners) {
    if (Array.isArray(owners)) {
      let currentOwners = new Set(this.owners)
      let newOwners = new Set(owners)
      let removeOwners = new Set([...currentOwners].filter(x => !newOwners.has(x)))
      let addOwners = new Set([...newOwners].filter(x => !currentOwners.has(x)))

      Array.from(removeOwners).map(owner => this.removeOwner(owner))
      Array.from(addOwners).map(owner => this.addOwner(owner))
    } else {
      throw new ValidationError('owners should be an array')
    }
  }

  validateOwner (owner) {
    if (typeof owner !== 'string') throw new ValidationError('owner should be an id')
  }

  addOwner (owner) {
    this.validateOwner(owner)
    this.owners = this.owners || []
    this.owners.push(owner)
  }

  removeOwner (owner) {
    this.validateOwner(owner)
    remove(this.owners, owner)
  }

  static uuid () {
    return uuid.v4()
  }

  // Find all of a certain type e.g.
  // User.all()
  static all (options) {
    options = options || {}
    return db.rel.find(
      this.type
    ).then(
      (results) => {
        return results[this.type + 's']
      }
    ).catch(
      (err) => {
        console.error(err)
      }
    )
  }

  // Find by id e.g.
  // User.find('394')
  static find (id, options) {
    let plural = this.type + 's'
    return db.rel.find(this.type, id).then(results => {
      let result = results[plural].find(result => result.id === id)
      if (!result) {
        throw new NotFoundError()
      } else {
        return new this(result)
      }
    }).catch(err => {
      if (err.name === 'NotFoundError') {
        logger.info('Object not found:', this.type, id)
      }
      throw err
    })
  }

  static findByField (field, value) {
    logger.info('Finding', field, value)
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
