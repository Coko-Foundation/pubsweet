'use strict'

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

  // Creates the basic roles: admin, contributor, reader
  // There's an additional implicit role: owner
  static createRoles () {
    return new Role({
      name: 'admin',
      resources: ['users', 'collections', 'fragments'],
      permissions: '*'
    }).save().then(function () {
      return new Role({
        name: 'contributor',
        resources: ['fragments'],
        permissions: 'create'
      }).save()
    }).then(function () {
      return new Role({
        name: 'reader',
        resources: ['fragments'],
        permissions: 'read'
      })
    })
  }
}

module.exports = Setup
