#!/usr/bin/env node

const program = require('commander')
const logger = require('../src/logger')
const path = require('path')
const fs = require('fs-extra')
const colors = require('colors/safe')

const properties = {
  username: {
    description: 'Username'
  },
  email: {
    description: 'Email address'
  },
  password: {
    description: 'Password',
    hidden: true,
    replace: '*'
  },
  admin: {
    description: 'Give user admin privileges',
    type: 'boolean',
    default: 'true'
  }
}

program
  .arguments('[path]')
  .description('Add a user to the database for pubsweet app at [path].')
  .option('--dev', 'Add user to development mode database')

for (let key in properties) {
  let value = properties[key]
  if (value.type && value.type === 'boolean') {
    program.option(`--${key}`, properties[key].description)
  } else {
    program.option(`--${key} [string]`, properties[key].description)
  }
}

program.parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'

const appPath = program.args[0]

const dbPath = path.join(appPath, 'api', 'db', process.env.NODE_ENV)
const dbCheckPath = path.join(dbPath, 'CURRENT')

if (!appPath || appPath.length === 0) {
  const eg = colors.bold(`pubsweet adduser ${colors.italic('./myapp')}`)
  logger.error(`You must specify an app path, e.g. ${eg}`)
  process.exit(1)
}

const checkExists = () => new Promise(
  (resolve, reject) => {
    fs.stat(appPath, (err, stats) => {
      if (err) return reject(err)
      if (stats.isDirectory()) return resolve()
      logger.error('Path must be a directory containing a pubsweet app')
      logger.error('The path you provided is not a directory')
      logger.error('To generate a new app, see `pubsweet help new`')
      process.exit(1)
    })
  }
)

const checkDb = () => new Promise(
  (resolve, reject) => {
    fs.stat(dbCheckPath, (err, stats) => {
      if (err) {
        logger.error('Database appears not to exist')
        logger.error('To create the database for an existing app, see `pubsweet help setupdb`')
        logger.error('To generate a new app, see `pubsweet help new`')
        process.exit(1)
      } else {
        return resolve()
      }
    })
  }
)

const chdir = () => new Promise(
  (resolve, reject) => {
    process.chdir(appPath)
    require('../src/load-config')(path.resolve('', './config'))
    resolve()
  }
)

logger.info('Adding user to app database at path', dbPath)

checkExists().then(
  checkDb
).then(
  chdir
).then(
  require('../src/add-user')({
    properties: properties,
    override: program
  })
).catch(
  err => {
    logger.error(err.stack)
    process.exit(1)
  }
)
