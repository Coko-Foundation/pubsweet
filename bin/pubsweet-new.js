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
  .arguments('[name]')
  .description('Generate a new app in directory [name].')
  .option('--dev', 'Setup app for development')
  .option('--clobber', 'Overwrite any existing files')

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

const checkNoApp = () => new Promise(
  (resolve, reject) => {
    fs.stat(appname, (err, stats) => {
      if (err) return resolve()
      if (stats.isDirectory() && fs.readdirSync(appname).length > 1) {
        logger.info('Target directory exists aready and is non-empty')
        if (program.clobber) {
          logger.info('Overwriting any existing files due to --clobber flag')
          return resolve()
        } else {
          logger.error('If you want to overwrite existing files, use --clobber')
          process.exit(1)
        }
      } else {
        return resolve()
      }
    })
  }
)

const chdir = () => new Promise(
  (resolve, reject) => {
    fs.mkdirsSync(appname)
    process.chdir(appname)
    resolve()
  }
)

logger.info('Generating new PubSweet app:', appname)

checkNoApp().then(
  chdir
).then(
  require('../src/generate-config')
).then(
  require('../src/generate-env')
).then(
  () => require('../src/initial-app')(appname)
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
