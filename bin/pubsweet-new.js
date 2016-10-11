#!/usr/bin/env node

const program = require('commander')
const logger = require('../src/logger')
const path = require('path')
const fs = require('fs-extra')
const colors = require('colors/safe')

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

program.arguments('[name]')
program.option('--dev', 'Setup app for development')

for (var key in properties) {
  program.option(`--${key} [string]`, properties[key].description)
}

program.parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'

const appname = program.args[0]

if (!appname || appname.length === 0) {
  const eg = colors.bold(`pubsweet new ${colors.italic('myappname')}`)
  logger.error(`You must specify an app name, e.g. ${eg}`)
  process.exit(1)
}

fs.mkdirsSync(appname)
process.chdir(appname)

logger.info('Generating new PubSweet app:', appname)

require('../src/generate-config')(
).then(
  () => require('../src/initial-app')(appname)
).then(
  () => {
    logger.info('Running initial app setup...')
    return require('../src/setup-db')({
      properties: properties,
      override: program
    })
  }
).catch(
  err => {
    logger.error(err.stack)
    process.exit(1)
  }
)
