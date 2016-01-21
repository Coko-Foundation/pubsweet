#!/usr/bin/env node
'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const Collection = require('./models/collection')
const User = require('./models/user')
const Role = require('./models/role')

class Setup {
  static setup (username, email, password, collection) {
    return new Collection({title: collection}).save().then(function (response) {
      return new Role({
        name: 'admin',
        resource: 'collections',
        permissions: '*'
      }).save()
    }).then(function () {
      return new User({
        username: username,
        email: email,
        password: password
      }).save()
    }).then(function (user) {
      return user.addRole('admin')
    }).then(function (user) {
      console.log('Added user ', username, ' to admin role.')
    })
  }
}

var prompt = require('prompt')
prompt.start()

prompt.message = 'Question!'.rainbow
prompt.delimiter = '><'.green

// Get two properties from the user: admin email and password
prompt.get({
  properties: {
    username: {
      description: "What is the admin's username?".magenta
    },
    email: {
      description: "What is the admin's email?".yellow
    },
    password: {
      description: "What is the admin's password?".blue
    },
    collection: {
      description: "What is the collection's name?".cyan
    }
  }}, function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log('Received the following answers:')
    console.log('  username: ' + result.username)
    console.log('  email: ' + result.email)
    console.log('  password: ' + result.password)
    console.log('  collection: ' + result.collection)

    // Setup
    Setup.setup(result.username, result.email, result.password, result.collection).then(function () {
      console.log('Your PubSweet is now ready!'.rainbow)
    })
  }
})
