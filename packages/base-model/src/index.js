const uuid = require('uuid')
const { Model, transaction } = require('objection')
const logger = require('@pubsweet/logger')
const { NotFoundError } = require('@pubsweet/errors')
const db = require('@pubsweet/db-manager/src/db')
const { merge } = require('lodash')
const config = require('config')

Model.knex(db)

const notFoundError = (property, value, className) =>
  new NotFoundError(`Object not found: ${className} with ${property} ${value}`)

const integrityError = (property, value, message) =>
  new Error(
    `Data Integrity Error property ${property} set to ${value}: ${message}`,
  )

class BaseModel extends Model {
  constructor(properties) {
    super(properties)

    if (properties) {
      this._updateProperties(properties)
    }
  }

  static get jsonSchema() {
    // JSON schema validation is getting proper support for inheritance in
    // its draft 8: https://github.com/json-schema-org/json-schema-spec/issues/556
    // Until then, we're not using additionalProperties: false, and letting the
    // database handle this bit of the integrity checks.

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
        updated: { type: ['string', 'object'], format: 'date-time' },
      },
      additionalProperties: false,
    }

    if (schema) {
      return merge(baseSchema, schema)
    }

    return baseSchema
  }

  $beforeInsert() {
    this.id = this.id || uuid.v4()
    this.created = new Date().toISOString()
    this.updated = this.created
  }

  $beforeUpdate() {
    this.updated = new Date().toISOString()
  }

  saveGraph(opts = {}) {
    const updateAndFetch = (graph, trx) =>
      this.constructor
        .query(trx)
        .upsertGraphAndFetch(
          graph,
          Object.assign({ insertMissing: true, noDelete: true }, opts),
        )

    const insertAndFetch = (graph, trx) =>
      this.constructor.query(trx).insertGraphAndFetch(graph, opts)

    return this._save(insertAndFetch, updateAndFetch)
  }

  save() {
    const updateAndFetch = (instance, trx) =>
      this.constructor.query(trx).patchAndFetchById(instance.id, instance)

    const insertAndFetch = (instance, trx) =>
      this.constructor.query(trx).insertAndFetch(instance)

    return this._save(insertAndFetch, updateAndFetch)
  }

  async _save(insertAndFetch, updateAndFetch) {
    const simpleSave = (trx = null) => updateAndFetch(this, trx)

    const protectedSave = async trx => {
      const current = await this.constructor
        .query(trx)
        .findById(this.id)
        .forUpdate()

      const storedUpdateTime = new Date(current.updated).getTime()
      const instanceUpdateTime = new Date(this.updated).getTime()

      if (instanceUpdateTime < storedUpdateTime) {
        throw integrityError(
          'updated',
          this.updated,
          'is older than the one stored in the database!',
        )
      }

      return simpleSave(trx)
    }

    // start of save function...
    let result
    // Do the validation manually here, since inserting
    // model instances skips validation, and using toJSON() first will
    // not save certain fields ommited in $formatJSON (e.g. passwordHash)
    this.$validate()
    try {
      result = await transaction(BaseModel.knex(), async trx => {
        let savedEntity

        // If an id is set on the model instance, find out if the instance
        // already exists in the database
        if (this.id) {
          if (!this.updated && this.created) {
            throw integrityError(
              'updated',
              this.updated,
              'must be set when created is set!',
            )
          }
          if (!this.updated && !this.created) {
            savedEntity = await simpleSave(trx)
          } else {
            // If the model instance has created/updated times set, provide
            // protection against potentially overwriting newer data in db.
            savedEntity = await protectedSave(trx)
          }
        }
        // If it doesn't exist, simply insert the instance in the database
        if (!savedEntity) {
          savedEntity = await insertAndFetch(this, trx)
        }
        return savedEntity
      })
      logger.info(`Saved ${this.constructor.name} with UUID ${result.id}`)
    } catch (err) {
      logger.info(`Rolled back ${this.constructor.name}`)
      logger.error(err)
      throw err
    }

    return result
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

  static async find(id, options) {
    let query = this.query().findById(id)
    query = options && options.eager ? query.eager(options.eager) : query

    const object = await query

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
