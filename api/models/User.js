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
      this.passwordHash = bcrypt.hashSync(properties.password, 1)
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

  addRole (role) {
    return Role.addUserRoles(this.id, role, User).then(function () {
      return this
    }.bind(this))
  }

  removeRole (role) {
    return Role.removeUserRoles(this.id, role, User).then(function () {
      return this
    }.bind(this))
  }

  // e.g. user.setRoles(['admin', 'contributor'])
  setRoles (newRoles) {
    var rolesToAdd = _.difference(newRoles, this.roles)
    var rolesToRemove = _.difference(this.roles, newRoles)

    var promises = rolesToAdd.map(function (role) {
      return this.addRole(role)
    })

    promises.concat(rolesToRemove.map(function (role) {
      return this.removeRole(role)
    }))

    return Promise.all(promises).then(function () {
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

module.exports = User
