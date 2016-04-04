'use strict'
const Model = require('./Model')
const Role = require('./Role')

const ConflictError = require('../errors/ConflictError')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

class User extends Model {
  constructor (properties) {
    super(properties)

    // Hash and delete the password if it's set
    if (properties.password) {
      this.passwordHash = bcrypt.hashSync(properties.password, 10)
      delete this.password
    }

    this.type = 'user'
    this.email = properties.email
    this.username = properties.username
  }

  updateProperties (properties) {
    // Roles are updated separately in an async manner
    var roles = properties.roles
    delete properties['roles']
    super.updateProperties(properties)

    if (roles) {
      return this.setRoles(roles).then(function () {
        this.roles = roles
        return this
      }.bind(this))
    } else {
      return this
    }
  }

  validPassword (password) {
    return bcrypt.compareSync(password, this.passwordHash)
  }

  roles () {
    return Role.userRoles(this.username)
  }

  addRole (role) {
    return Role.addUserRoles(this.username, role).then(function () {
      return this
    }.bind(this))
  }

  removeRole (role) {
    return Role.removeUserRoles(this.username, role)
  }

  // e.g. user.setRoles(['admin', 'contributor'])
  setRoles (newRoles) {
    var existingRoles
    return this.roles().then(function (roles) {
      existingRoles = roles
      return _.difference(newRoles, existingRoles)
    }).then(function (rolesToAdd) {
      var promises = rolesToAdd.map(function (role) {
        return this.addRole(role)
      }.bind(this))
      return Promise.all(promises)
    }.bind(this)).then(function () {
      return _.difference(existingRoles, newRoles)
    }).then(function (rolesToRemove) {
      var promises = rolesToRemove.map(function (role) {
        return this.removeRole(role)
      }.bind(this))
      return Promise.all(promises)
    }.bind(this)).then(function () {
      return newRoles
    }).catch(function (err) {
      throw err
    })
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
User.relations = ['roles']

module.exports = User
