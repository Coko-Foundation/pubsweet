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

  save () {
    if (this.password) {
      return this.hashPassword(this.password).then(hash => {
        delete this.password
        this.passwordHash = hash
      }).then(() => super.save())
    } else {
      return super.save()
    }
  }

  validPassword (password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  hashPassword (password) {
    return bcrypt.hash(password, BCRYPT_COST)
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

module.exports = User
