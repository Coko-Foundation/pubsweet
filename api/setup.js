#!/usr/bin/env node
'use strict'

const Setup = require('./setup-base.js')

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
