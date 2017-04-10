#!/usr/bin/env node

const program = require('commander')
const logger = require('../src/logger')
const fs = require('fs-extra')
const path = require('path')
const colors = require('colors/safe')

const properties = require('../src/db-properties')

program
  .arguments('[name]')
  .description('Generate a new app in directory [name].')
  .option('--dev', 'Setup app for development')
  .option('--clobber', 'Overwrite any existing files')

for (const key in properties) {
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

const run = async () => {
  await checkNoApp()
  await chdir()
  await require('../src/generate-config')()
  await require('../src/generate-env')()
  await require('../src/initial-app')(appname)
  require('../src/load-config')(path.resolve('', './config'))
  await require('../src/setup-db')({
    properties: require('../src/db-properties'),
    override: program
  })
}

run()
