const uuid = require('uuid')
const { Model, ValidationError } = require('objection')
const logger = require('@pubsweet/logger')
const { db, NotFoundError } = require('pubsweet-server')
const { merge } = require('lodash')
const config = require('config')

Model.knex(db)

const validationError = (prop, className) =>
  new ValidationError({
    type: 'ModelValidation',
    message: `${prop} is not a property in ${className}'s schema`,
  })

const notFoundError = (property, value, className) =>
  new NotFoundError(`Object not found: ${className} with ${property} ${value}`)

class BaseModel extends Model {
  constructor(properties) {
    super(properties)

    if (properties) {
      this.updateProperties(properties)
    }

    const handler = {
      set: (obj, prop, value) => {
        if (this.isSettable(prop)) {
          obj[prop] = value
          return true
        }

        throw validationError(prop, obj.constructor.name)
      },
    }

    return new Proxy(this, handler)
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
      mergeSchema(config.schema[object.name])

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
      additionalProperties: false,
    }

    if (schema) {
      return merge(baseSchema, schema)
    }
    return baseSchema
  }

  isSettable(prop) {
    const special = ['#id', '#ref']
    return (
      special.includes(prop) ||
      this.constructor.jsonSchema.properties[prop] ||
      (this.constructor.relationMappings &&
        this.constructor.relationMappings[prop])
    )
  }

  $beforeInsert() {
    this.id = this.id || uuid.v4()
    this.created = new Date().toISOString()
    this.updated = this.created
  }

  $beforeUpdate() {
    this.updated = new Date().toISOString()
  }

  async save() {
    let saved
    if (this.id) {
      saved = await this.constructor
        .query()
        .patchAndFetchById(this.id, this.toJSON())
    }

    if (!saved) {
      // either model has no ID or the ID was not found in the database
      saved = await this.constructor.query().insert(this.toJSON())
    }
    logger.info(`Saved ${this.constructor.name} with UUID ${saved.id}`)
    return saved
  }

  async delete() {
    const deleted = await this.$query().delete()
    logger.info(`Deleted ${deleted} ${this.constructor.name} records.`)
    return this
  }

  updateProperties(properties) {
    Object.keys(properties).forEach(prop => {
      if (this.isSettable(prop)) {
        this[prop] = properties[prop]
      } else {
        throw validationError(prop, this.constructor.name)
      }
    })
  }

  setOwners(owners) {
    this.owners = owners
  }

  static async find(id) {
    const object = await this.query().findById(id)

    if (!object) {
      throw notFoundError('id', id, this.constructor.name)
    }

    return object
  }

  static async findByField(field, value) {
    logger.debug('Finding', field, value)

    const results = await this.query().where(field, value)

    return results
  }

  static async findOneByField(field, value) {
    const results = await this.query()
      .where(field, value)
      .limit(1)
    if (!results.length) {
      throw notFoundError(field, value, this.constructor.name)
    }

    return results[0]
  }

  static async all() {
    return this.query()
  }
}

BaseModel.pickJsonSchemaProperties = true
module.exports = BaseModel
