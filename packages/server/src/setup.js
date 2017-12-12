#!/usr/bin/env node
'use strict'

const Setup = require('./setup-base.js')

const prompt = require('prompt')
const argvs = require('minimist')(process.argv.slice(2))
const colors = require('colors/safe')

const logger = require('@pubsweet/logger')

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
      collectionTitle: {
        description: colors.cyan("What is the collection's title?")
      }
    }
  },
  (err, result) => {
    if (err) return logger.info(err)

    logger.info('Received the following answers:')
    logger.info('  username: ' + result.username)
    logger.info('  email: ' + result.email)
    logger.info('  password: ' + result.password)
    logger.info('  collection: ' + result.collectionTitle)

    // Setup
    let admin = {
      username: result.username,
      email: result.email,
      password: result.password
    }

    Setup.setup(
      admin,
      {title: result.collectionTitle}
    ).then(
      () => { logger.info(colors.rainbow('Your PubSweet is now ready!')) }
    )
  }
)