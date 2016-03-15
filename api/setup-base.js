'use strict'

const config = require('../config')

const Collection = require('./models/collection')
const User = require('./models/user')
const Role = require('./models/role')

class Setup {
  static setup (username, email, password, collection) {
    console.log('Starting setup')
    return new Collection({title: collection}).save().then(function (response) {
      console.log('Created initial collection: ', collection)
      return this.createRoles()
    }.bind(this)).then(function () {
      console.log('Created initial roles.')
      return new User({
        username: username,
        email: email,
        password: password
      }).save()
    }).then(function (user) {
      console.log('Created user: ', user)
      return user.addRole('admin')
    }).then(function (user) {
      console.log('Added user', user, 'to admin role.')
      return user
    }).catch(function (error) {
      console.error(error)
    })
  }

  static createRoles () {
    return Promise.all(config.roles.map(function (role) {
      return new Role(role)
    }))
  }
}

module.exports = Setup
