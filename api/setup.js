#!/usr/bin/env node
'use strict'

const Setup = require('./setup-base.js')

const prompt = require('prompt')
const argvs = require('minimist')(process.argv.slice(2))
const colors = require('colors/safe')

const logger = require('./logger')

prompt.override = argvs
prompt.start()

prompt.message = colors.rainbow('Question!')
prompt.delimiter = colors.green('><')

// Get two properties from the user: admin email and password
prompt.get(
  {
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
    }
  },
  (err, result) => {
    if (err) return logger.info(err)

    logger.info('Received the following answers:')
    logger.info('  username: ' + result.username)
    logger.info('  email: ' + result.email)
    logger.info('  password: ' + result.password)
    logger.info('  collection: ' + result.collection)

    // Setup
    Setup.setup(
      result.username,
      result.email,
      result.password,
      result.collection
    ).then(
      () => { logger.info(colors.rainbow('Your PubSweet is now ready!')) }
    )
  }
)
