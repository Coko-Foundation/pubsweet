const BaseModel = require('@pubsweet/base-model')
const bcrypt = require('bcrypt')
const pick = require('lodash/pick')
const config = require('config')

const BCRYPT_COST = config.util.getEnv('NODE_ENV') === 'test' ? 1 : 12

class User extends BaseModel {
  constructor(properties) {
    super(properties)
    this.type = 'user'
    this.collections = this.collections || []
    this.fragments = this.fragments || []
  }

  $formatJson(json) {
    json = super.$formatJson(json)
    delete json.passwordHash
    return json
  }

  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      teams: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: require.resolve('@pubsweet/model-team/src/team'),
        join: {
          from: 'users.id',
          through: {
            modelClass: require.resolve('@pubsweet/model-team/src/team_member'),
            from: 'team_members.user_id',
            to: 'team_members.team_id',
          },
          to: 'teams.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        admin: { type: ['boolean', 'null'] },
        email: { type: 'string', format: 'email' },
        username: { type: 'string', pattern: '^[a-zA-Z0-9]+' },
        passwordHash: { type: 'string' },
        passwordResetToken: { type: ['string', 'null'] },
        passwordResetTimestamp: {
          type: ['string', 'object', 'null'],
          format: 'date-time',
        },
        fragments: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        },
        collections: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        },
        teams: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        },
      },
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setOwners() {
    // FIXME: this is overriden to be a no-op, because setOwners() is called by
    // the API on create for all entity types and setting `owners` on a User is
    // not allowed. This should instead be solved by having separate code paths
    // in the API for different entity types.
  }

  async save() {
    if (this.password) {
      this.passwordHash = await User.hashPassword(this.password)
      delete this.password
    }

    return super.save()
  }

  validPassword(password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  static hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_COST)
  }

  static findByEmail(email) {
    return this.findByField('email', email).then(users => users[0])
  }

  static findByUsername(username) {
    return this.findByField('username', username).then(users => users[0])
  }

  // For API display/JSON purposes only
  static ownersWithUsername(object) {
    return Promise.all(
      object.owners.map(async ownerId => {
        const owner = await this.find(ownerId)
        return pick(owner, ['id', 'username'])
      }),
    )
  }
}

User.type = 'user'

module.exports = User
