'use strict'
const Model = require('./Model')
const ConflictError = require('../errors/ConflictError')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

class User extends Model {
  constructor (properties) {
    super(properties)

    if (this.password) {
      this.hashPassword(this.password)
      delete this.password
    }

    this.type = 'user'
    this.email = properties.email
    this.username = properties.username
  }

  validPassword (password) {
    return bcrypt.compareSync(password, this.passwordHash)
  }

  hashPassword (password) {
    this.passwordHash = bcrypt.hashSync(password, 1)
  }

  updateProperties (properties) {
    if (properties.password) {
      this.hashPassword(properties.password)
      delete properties.password
    }

    return super.updateProperties(properties)
  }

  isUniq () {
    return User.findByEmail(this.email).then(function (user) {
      throw new ConflictError('User exists')
    }).catch(function (err) {
      if (err.name === 'NotFoundError') {
        return User.findByUsername(this.username)
      } else {
        throw err
      }
    }.bind(this)).then(function (user) {
      throw new ConflictError('User exists')
    }).catch(function (err) {
      if (err.name === 'NotFoundError') {
        return true
      } else {
        throw err
      }
    })
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

User.schema = Joi.object().keys({
  id: Joi.string().guid().required(),
  type: Joi.string(),
  username: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  passwordHash: Joi.string().required(),
  admin: Joi.boolean(),
  rev: Joi.string(),
  fragments: Joi.array().items(Joi.string().guid()),
  collections: Joi.array().items(Joi.string().guid()),
  teams: Joi.array().items(Joi.string().guid())
})

module.exports = User
