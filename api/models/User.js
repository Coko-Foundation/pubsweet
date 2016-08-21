'use strict'
const Model = require('./Model')
const ConflictError = require('../errors/ConflictError')
const bcrypt = require('bcryptjs')

class User extends Model {
  constructor (properties) {
    super(properties)

    // Hash and delete the password if it's set
    if (properties.password) {
      this.passwordHash = bcrypt.hashSync(properties.password, 1)
      delete this.password
    }

    this.type = 'user'
    this.email = properties.email
    this.username = properties.username
  }

  validPassword (password) {
    return bcrypt.compareSync(password, this.passwordHash)
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
}

User.type = 'user'

module.exports = User
