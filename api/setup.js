#!/usr/bin/env node
'use strict'

const Setup = require('./setup-base.js')

var prompt = require('prompt')
var argvs = require('minimist')(process.argv.slice(2))
var colors = require('colors/safe')

prompt.override = argvs
prompt.start()

prompt.message = colors.rainbow('Question!')
prompt.delimiter = colors.green('><')

// Get two properties from the user: admin email and password
prompt.get({
  properties: {
    username: {
      description: colors.magenta("What is the admin's username?")
    },
    email: {
      description: colors.yellow("What is the admin's email?")
    },
    password: {
      description: colors.blue("What is the admin's password?")
    },
    collection: {
      description: colors.cyan("What is the collection's name?")
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
      console.log(colors.rainbow('Your PubSweet is now ready!'))
    })
  }
})
