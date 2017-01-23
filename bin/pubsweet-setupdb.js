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

program
  .arguments('[path]')
  .description('Setup a database for your PubSweet app, [path] should be the root of the app')
  .option('--dev', 'Generate development mode database')
  .option('--clobber', 'Overwrite any existing database')

for (const key in properties) {
  program.option(`--${key} [string]`, properties[key].description)
}

program.parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'

const appPath = program.args[0]

const dbPath = path.join(appPath, 'api', 'db', process.env.NODE_ENV)
const dbCheckPath = path.join(dbPath, 'CURRENT')

if (!appPath || appPath.length === 0) {
  const eg = colors.bold(`pubsweet setupdb ${colors.italic('./myapp')}`)
  logger.error(`You must specify an app path, e.g. ${eg}`)
  process.exit(1)
}

const clobber = () => fs.emptyDirSync(dbPath)

const checkExists = () => new Promise(
  (resolve, reject) => {
    fs.stat(appPath, (err, stats) => {
      if (err) return reject(err)
      if (stats.isDirectory()) return resolve()
      logger.error('Path must be a directory containing a pubsweet app')
      logger.error('To generate a new app, see `pubsweet help new`')
      process.exit(1)
    })
  }
)

const checkNoDb = () => new Promise(
  (resolve, reject) => {
    fs.stat(dbCheckPath, (err, stats) => {
      if (err) return resolve()
      if (program.clobber) {
        logger.info('Database appears to already exist')
        logger.info('Overwriting existing database due to --clobber flag')
        clobber()
        return resolve()
      } else {
        logger.error('Database appears to already exist')
        logger.error('If you want to overwrite the database, use --clobber')
        process.exit(1)
      }
    })
  }
)

const chdir = () => new Promise(
  (resolve, reject) => {
    process.chdir(appPath)
    resolve()
  }
)

const loadconfig = () => new Promise(
  (resolve, reject) => {
    require('../src/load-config')(path.resolve('', './config'))
    resolve()
  }
)

logger.info('Generating PubSweet app database at path', dbPath)

checkExists().then(
  checkNoDb
).then(
  chdir
).then(
  require('../src/generate-config')
).then(
  require('../src/generate-env')
).then(
  loadconfig
).then(
  require('../src/setup-db')({
    properties: properties,
    override: program
  })
).catch(
  err => {
    logger.error(err.stack)
    process.exit(1)
  }
)
