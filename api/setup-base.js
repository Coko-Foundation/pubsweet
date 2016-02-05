'use strict'

const Collection = require('./models/collection')
const User = require('./models/user')
const Role = require('./models/role')

class Setup {
  static setup (username, email, password, collection) {
    console.log('Starting setup')
    return new Collection({title: collection}).save().then(function (response) {
      console.log('Created initial collection: ', collection)
      return new Role({
        name: 'admin',
        resources: 'collections',
        permissions: '*'
      }).save()
    }).then(function () {
      console.log('Created initial admin role.')
      return new User({
        username: username,
        email: email,
        password: password
      }).save()
    }).then(function (user) {
      console.log('Created user: ', user)
      return user.addRole('admin')
    }).then(function (user) {
      console.log('Added user ', username, ' to admin role.')
    }).catch(function (error) {
      console.error(error)
    })
  }
}

module.exports = Setup
