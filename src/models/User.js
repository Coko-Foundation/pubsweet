'use strict'
const Model = require('./Model')
const ConflictError = require('../errors/ConflictError')
const bcrypt = require('bcrypt')

const BCRYPT_COST = process.env.NODE_ENV === 'test' ? 1 : 12

class User extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'user'
    this.email = properties.email
    this.username = properties.username
  }

  async save () {
    if (this.password) {
      this.passwordHash = await this.hashPassword(this.password)
      delete this.password
    }

    return Model.prototype.save.call(this)
  }

  validPassword (password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  hashPassword (password) {
    return bcrypt.hash(password, BCRYPT_COST)
  }

  async isUniq (user) {
    let result

    const notNotFoundCatcher = e => {
      if (e.name !== 'NotFoundError') throw e
    }

    result = await User.findByEmail(user.email).catch(notNotFoundCatcher)

    if (result) {
      throw new ConflictError('User already exists')
    }

    result = await User.findByUsername(user.email).catch(notNotFoundCatcher)

    if (result) {
      throw new ConflictError('User already exists')
    }
  }

  static findByEmail (email) {
    return this.findByField('email', email).then(function (users) {
      return users[0]
    })
  }

  static findByUsername (username) {
    return this.findByField('username', username).then(function (users) {
      return users[0]
    })
  }

  // For API display/JSON purposes only
  static ownersWithUsername (object) {
    return Promise.all(object.owners.map(ownerId => this.find(ownerId)))
      .then(owners => {
        return owners.map(owner => ({id: owner.id, username: owner.username}))
      }).then(owners => {
        object.owners = owners
        return object
      })
  }
}

User.type = 'user'

module.exports = User
