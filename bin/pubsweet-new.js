#!/usr/bin/env node

const program = require('commander')
const logger = require('../src/logger')

const properties = {
  username: {
    description: 'Admin username'
  },
  email: {
    description: 'Admin email address'
  },
  password: {
    description: 'Admin password',
    hidden: true,
    replace: '*'
  },
  collection: {
    description: 'Initial collection title'
  }
}

program.option('--dev', 'Setup app for development')

for (var key in properties) {
  program.option(`--${key} [string]`, properties[key].description)
}

program.parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'

const appname = program.args[0]

logger.info('Generating new PubSweet app:', appname)

const initialApp = require('../src/initial-app')
const setupDB = require('../src/setup-db')

initialApp(
  appname
).then(
  () => {
    logger.info('Running initial app setup...')
    return setupDB({
      properties: properties,
      override: program
    })
  }
).catch(
  logger.error
)
