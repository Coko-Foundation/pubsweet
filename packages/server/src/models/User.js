const Model = require('./Model')
const ConflictError = require('../errors/ConflictError')
const bcrypt = require('bcrypt')
const omit = require('lodash/omit')
const pick = require('lodash/pick')
const config = require('config')

const BCRYPT_COST = config.util.getEnv('NODE_ENV') === 'test' ? 1 : 12

class User extends Model {
  constructor(properties) {
    super(properties)

    this.type = 'user'
    this.email = properties.email
    this.username = properties.username
    this.collections = this.collections || []
    this.fragments = this.fragments || []
    this.teams = this.teams || []
  }

  toJSON() {
    return omit(this, ['passwordHash'])
  }

  // eslint-disable-next-line class-methods-use-this
  setOwners() {
    // FIXME: this is overriden to be a no-op, because setOwners() is called by
    // the API on create for all entity types and setting `owners` on a User is
    // not allowed. This should instead be solved by having separate code paths
    // in the API for different entity types.
  }

  async save() {
    if (!this.id) {
      await User.isUniq(this)
    }

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

  static async isUniq(user) {
    let result

    const swallowNotFound = e => {
      if (e.name !== 'NotFoundError') throw e
    }

    result = await User.findByEmail(user.email).catch(swallowNotFound)

    if (!result) {
      result = await User.findByUsername(user.username).catch(swallowNotFound)
    }

    if (result) {
      throw new ConflictError('User already exists')
    }
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
