const uuid = require('uuid')
const Joi = require('joi')
const config = require('config')
const { Client } = require('pg')

const logger = require('@pubsweet/logger')
const db = require('../db')
const NotFoundError = require('../errors/NotFoundError')
const ValidationError = require('../errors/ValidationError')

let validations
if (config.validations) {
  const appValidations = require(config.validations)
  validations = require('./validations')(appValidations)
} else {
  validations = require('./validations')()
}

class Model {
  constructor(properties) {
    Object.assign(this, properties)
  }

  static validations() {
    return validations[this.type]
  }

  validate() {
    const validation = Joi.validate(this, this.constructor.validations())

    if (validation.error) {
      logger.error(validation.error)
      throw validation.error
    }

    return true
  }

  async save() {
    let isNew = false
    if (!this.id) {
      isNew = true
      this.id = Model.uuid()
    }

    this.validate()

    const data = { ...this }
    // remove id and any custom toJSON function
    delete data.id
    delete data.toJSON

    if (isNew) {
      logger.debug('Saving', this.type, this.id)
      await db.raw('INSERT INTO entities (id, data) VALUES (?, ?)', [
        this.id,
        data,
      ])
    } else {
      logger.debug('Updating', this.type, this.id)
      await db.raw('UPDATE entities SET data = ? WHERE id = ?', [data, this.id])
    }

    return this
  }

  async delete() {
    await db.raw(`DELETE FROM entities WHERE data->>'type' = ? AND id = ?`, [
      this.type,
      this.id,
    ])
    logger.debug('Deleted', this.type, this.id)
    return this
  }

  async updateProperties(properties) {
    // These properties are modified through setters
    delete properties.owners

    logger.debug('Updating properties to', properties)

    const validation = Joi.validate(properties, {}, { allowUnknown: true })
    if (validation.error) throw validation.error

    Object.assign(this, properties)
    return this
  }

  setOwners(owners) {
    if (Array.isArray(owners)) {
      owners.forEach(owner => this.constructor.validateOwner(owner))
      this.owners = owners
    } else {
      throw new ValidationError('owners should be an array')
    }
  }

  static validateOwner(owner) {
    if (typeof owner !== 'string')
      throw new ValidationError('owner should be an id')
  }

  isOwner(userId) {
    return Array.isArray(this.owners) && this.owners.includes(userId)
  }

  static uuid() {
    return uuid.v4()
  }

  // Find all of a certain type e.g.
  // User.all()
  static async all() {
    const { rows } = await db.raw(
      `SELECT * FROM entities WHERE data->>'type' = ?`,
      [this.type],
    )
    return rows.map(result => new this({ id: result.id, ...result.data }))
  }

  // Find by id e.g.
  // User.find('394')
  static async find(id) {
    const { rows } = await db.raw(
      `SELECT * FROM entities WHERE data->>'type' = ? AND id = ?`,
      [this.type, id],
    )

    if (rows.length === 0) {
      throw new NotFoundError(`Object not found: ${this.type} with id ${id}`)
    }

    return new this({ id: rows[0].id, ...rows[0].data })
  }

  // map dotted paths into JSONB accessors: one.two => data->'one'->>'two'
  static selectorToSql(selector) {
    const keys = Object.keys(selector).map(key => {
      const parts = key.split('.').map(Client.prototype.escapeLiteral)
      parts.unshift('data')
      const last = parts.pop()
      return `${parts.join('->')}->>${last}`
    })
    return keys.map((accessor, index) => `${accessor} = ?`)
  }

  // `field` is a string
  // `value` is a primitive, or a query object
  // or
  // `field` is an object of field, value pairs
  static async findByField(field, value) {
    logger.debug('Finding', field, value)

    const selector = {
      type: this.type,
    }

    if (value !== undefined) {
      selector[field] = value
    } else {
      Object.assign(selector, field)
    }
    const where = this.selectorToSql(selector)
    const { rows } = await db.raw(
      `SELECT id, data FROM entities WHERE ${where.join(' AND ')}`,
      Object.values(selector),
    )

    if (!rows.length) {
      throw new NotFoundError()
    }

    return rows.map(result => new this({ id: result.id, ...result.data }))
  }

  static async findOneByField(field, value) {
    const results = await this.findByField(field, value)

    return results.length ? results[0] : null
  }
}

module.exports = Model
