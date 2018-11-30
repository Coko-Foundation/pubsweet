const uuid = require('uuid')
const { Model } = require('objection')
const logger = require('@pubsweet/logger')
const { db, NotFoundError } = require('pubsweet-server')
const { merge } = require('lodash')
const config = require('config')

Model.knex(db)

const notFoundError = (property, value, className) =>
  new NotFoundError(`Object not found: ${className} with ${property} ${value}`)

class BaseModel extends Model {
  constructor(properties) {
    super(properties)

    if (properties) {
      this._updateProperties(properties)
    }
  }

  static get jsonSchema() {
    let schema

    const mergeSchema = additionalSchema => {
      if (additionalSchema) {
        schema = merge(schema, additionalSchema)
      }
    }

    // Crawls up the prototype chain to collect schema
    // information from models and extended models
    const getSchemasRecursively = object => {
      mergeSchema(object.schema)
      if (config.has('schema')) {
        mergeSchema(config.schema[object.name])
      }

      const proto = Object.getPrototypeOf(object)

      if (proto.name !== 'BaseModel') {
        getSchemasRecursively(proto)
      }
    }

    getSchemasRecursively(this)

    const baseSchema = {
      type: 'object',
      properties: {
        type: { type: 'string' },
        id: { type: 'string', format: 'uuid' },
        created: { type: ['string', 'object'], format: 'date-time' },
        updated: {
          anyOf: [
            { type: ['string', 'object'], format: 'date-time' },
            { type: 'null' },
          ],
        },
      },
    }

    if (schema) {
      return merge(baseSchema, schema)
    }
    return baseSchema
  }

  $beforeInsert() {
    this.id = this.id || uuid.v4()
    this.created = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated = new Date().toISOString()
  }

  async save() {
    let saved
    // Do the validation manually here, since inserting
    // model instances skips validation, and using toJSON() first will
    // not save certain fields ommited in $formatJSON (e.g. passwordHash)
    this.$validate()

    if (this.id) {
      saved = await this.constructor.query().patchAndFetchById(this.id, this)
    }

    if (!saved) {
      // either model has no ID or the ID was not found in the database
      saved = await this.constructor.query().insertAndFetch(this)
    }

    logger.info(`Saved ${this.constructor.name} with UUID ${saved.id}`)
    return saved
  }

  async delete() {
    const deleted = await this.$query().delete()
    logger.info(`Deleted ${deleted} ${this.constructor.name} records.`)
    return this
  }

  // A private method that you shouldn't override
  _updateProperties(properties) {
    Object.keys(properties).forEach(prop => {
      this[prop] = properties[prop]
    })
    return this
  }

  updateProperties(properties) {
    return this._updateProperties(properties)
  }

  setOwners(owners) {
    this.owners = owners
  }

  static async find(id) {
    const object = await this.query().findById(id)

    if (!object) {
      throw notFoundError('id', id, this.name)
    }

    return object
  }

  // `field` is a string, `value` is a primitive or
  // `field` is an object of field, value pairs
  static findByField(field, value) {
    logger.debug('Finding', field, value)

    if (value === undefined) {
      return this.query().where(field)
    }

    return this.query().where(field, value)
  }

  static async findOneByField(field, value) {
    const results = await this.query()
      .where(field, value)
      .limit(1)
    if (!results.length) {
      throw notFoundError(field, value, this.name)
    }

    return results[0]
  }

  static async all() {
    return this.query()
  }
}

BaseModel.pickJsonSchemaProperties = false
module.exports = BaseModel
