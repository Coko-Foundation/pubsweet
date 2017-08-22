'use strict'

const uuid = require('uuid')
const Joi = require('joi')
const Queue = require('promise-queue')

const schema = require('./schema')
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')
const logger = require('pubsweet-logger')
const validations = require('./validations')(require('../../config'))

schema()

const saveQueue = new Queue(1, Infinity)

class Model {
  constructor (properties) {
    schema()
    this.id = Model.uuid()
    Object.assign(this, properties)
  }

  static validations () {
    return validations[this.type]
  }

  validate () {
    let validation = Joi.validate(this, this.constructor.validations())

    if (validation.error) {
      logger.info(validation.error)
      throw validation.error
    }

    return true
  }

  async save () {
    logger.info('Saving', this.type, this.id)

    this.validate()

    return saveQueue.add(async () => {
      try {
        const existing = await this.constructor.find(this.id)
        logger.info('Found an existing version, this is an update of:', existing)
        this.rev = existing.rev
      } catch (error) {
        if (error.status !== 404) {
          throw error
        }

        // creating a new object, so check for uniqueness
        if (typeof this.isUniq === 'function') {
          await this.isUniq(this) // throws an exception if not unique
        }

        logger.info('No existing object found, creating a new one:', this.type, this.id)
      }

      return this._put()
    })
  }

  async _put () {
    await db.rel.save(this.constructor.type, this)
    logger.info('Actually _put', this.type, this.id, this)
    return this
  }

  async delete () {
    const object = await this.constructor.find(this.id)
    await db.rel.del(this.type, object)
    logger.info('Deleted', this.type, this.id)
    return this
  }

  async updateProperties (properties) {
    // These properties are modified through setters
    delete properties.owners

    logger.info('Updating properties to', properties)

    Object.assign(this, properties)
    return this
  }

  setOwners (owners) {
    if (Array.isArray(owners)) {
      owners.forEach(owner => this.validateOwner(owner))
      this.owners = owners
    } else {
      throw new ValidationError('owners should be an array')
    }
  }

  validateOwner (owner) {
    if (typeof owner !== 'string') throw new ValidationError('owner should be an id')
  }

  isOwner (userId) {
    return Array.isArray(this.owners) && this.owners.includes(userId)
  }

  static uuid () {
    return uuid.v4()
  }

  // Find all of a certain type e.g.
  // User.all()
  static async all () {
    const results = await db.rel.find(this.type)

    return results[this.type + 's'].map(result => new this(result))
  }

  // Find by id e.g.
  // User.find('394')
  static async find (id) {
    let plural = this.type + 's'
    let results

    try {
      results = await db.rel.find(this.type, id)
    } catch (err) {
      if (err.name === 'NotFoundError') {
        logger.info('Object not found:', this.type, id)
      }
      throw err
    }

    let result = results[plural].find(result => result.id === id)

    if (!result) {
      throw new NotFoundError()
    }

    return new this(result)
  }

  static async findByField (field, value) {
    logger.info('Finding', field, value)
    field = 'data.' + field

    let type = 'data.type'

    await db.createIndex({
      index: {
        fields: [field, type]
      }
    })

    const results = await db.find({
      selector: {
        [type]: this.type,
        [field]: value
      }
    })

    if (!results.docs.length) {
      throw new NotFoundError()
    }

    return results.docs.map(result => {
      let id = db.rel.parseDocID(result._id).id
      let foundObject = result.data
      foundObject.id = id
      foundObject.rev = result._rev
      return new this(foundObject)
    })
  }

  static async findOneByField (field, value) {
    const results = await this.findByField(field, value)

    return results.length ? results[0] : null
  }
}

module.exports = Model
