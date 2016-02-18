'use strict'
const Model = require('./model')
const Role = require('./role')

const ConflictError = require('../errors/ConflictError')

class User extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'user'
    this.email = properties.email
    this.password = properties.password // Bad, m'kay.
    this.username = properties.username
  }

  validPassword (password) {
    if (this.password === password) {
      return true
    } else {
      return false
    }
  }

  addRole (role) {
    return Role.addUserRoles(this.username, role).then(function () {
      return this
    }.bind(this))
  }

  removeRole (role) {
    return Role.removeUserRoles(this.username, role)
  }

  isUniq () {
    return User.findByEmail(this.email).then(function (user) {
      throw new ConflictError('User exists')
    }).catch(function (err) {
      if (err.name === 'not_found') {
        return User.findByUsername(this.username)
      } else {
        throw err
      }
    }).then(function (user) {
      throw new ConflictError('User exists')
    })
  }

  static findByEmail (email) {
    return db.createIndex({
      index: {
        fields: ['email', 'type']
      }
    }).then(function (result) {
      return db.find({selector: {
        type: 'user',
        email: email
      }})
    }).then(function (results) {
      return new this(results.docs[0])
    }.bind(this)).catch(function (err) {
      console.error('Error', err)
    })
  }

  static findByUsername (username) {
    console.log('findByUsername')
    return db.createIndex({
      index: {
        fields: ['username', 'type']
      }
    }).then(function (result) {
      return db.find({selector: {
        type: 'user',
        username: username
      }}).then(function (results) {
        return new this(results.docs[0])
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.error('Error', err)
    })
  }
}

User.type = 'user'

module.exports = User
