const BaseModel = require('@pubsweet/base-model')

const bcrypt = require('bcrypt')
const config = require('config')

const BCRYPT_COST = config.util.getEnv('NODE_ENV') === 'test' ? 1 : 12

class Identity extends BaseModel {
  static get tableName() {
    return 'identity'
  }

  static get schema() {
    return {
      properties: {
        type: { type: 'string' },
        passwordHash: { type: ['string', 'null'] },
        email: { type: ['string', 'null'] },
        aff: { type: ['string', 'null'] },
        name: { type: ['string', 'null'] },
        identifier: { type: ['string', 'null'] },
        userId: { type: 'string', format: 'uuid' },
        oauth: {
          type: 'object',
          properties: {
            accessToken: { type: ['string'] },
            refreshToken: { type: ['string'] },
          },
        },
      },
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: require('./user'),
        join: {
          from: 'identity.userId',
          to: 'user.id',
        },
      },
    }
  }

  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json)
    const { email } = json
    if (email) return { ...json, email: email.toLowerCase() }
    return { ...json }
  }

  async validPassword(password) {
    if (!this.passwordHash) return false
    return bcrypt.compare(password, this.passwordHash)
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_COST)
  }
}

module.exports = Identity
