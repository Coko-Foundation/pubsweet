'use strict'

// const config = require('../config')
const Collection = require('./models/Collection')
const User = require('./models/User')

class Setup {
  static setup (username, email, password, collection) {
    console.log('Starting setup')
    return new Collection({title: collection}).save().then(function (response) {
      console.log('Created initial collection: ', collection)

      return new User({
        username: username,
        email: email,
        password: password,
        admin: true
      }).save()
    }).then(function (user) {
      console.log('Created admin user: ', user)
    }).catch(function (error) {
      console.error(error)
    })
  }
}

module.exports = Setup
