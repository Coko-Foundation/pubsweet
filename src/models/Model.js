'use strict'

const uuid = require('uuid')
const remove = require('lodash/remove')
const Joi = require('joi')

const schema = require('./schema')
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')
const logger = require('../logger')
const config = require('../../config')

schema()

class Model {
  constructor (properties) {
    schema()
    this.id = Model.uuid()
    Object.assign(this, properties)
  }

  validate () {
    if(this.constructor.schema) {
      let validationConfiguration = 'validations.' + this.constructor.type
      let configurableValidations

      if(config.has(validationConfiguration)) {
        configurableValidations = config.get(validationConfiguration)
      }

      console.error(configurableValidations)
      let schema = Object.assign({}, this.constructor.schema, configurableValidations)
      let validation = Joi.validate(this, schema)
      if(validation.error) {
        console.log(validation)
        throw validation.error
      }
    }
  }

  save () {
    logger.info('Saving', this.type, this.id)

    this.validate()

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
    // These properties are modified through setters
    delete properties.owners

    logger.info('Updating properties to', properties)

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
