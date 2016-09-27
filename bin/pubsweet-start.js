#!/usr/bin/env node

const forever = require('forever-monitor')
const program = require('commander')
const logger = require('../src/logger')
const path = require('path')
const colors = require('colors/safe')

program.option('--dev', 'Run app for development')

program.parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'

let appname = program.args[0]
if (!appname) appname = process.cwd()
appname = path.resolve(appname)
process.chdir(appname)

require('../src/load-config')(path.resolve('', './config'))

logger.info('Starting PubSweet app:', appname)

const logpath = type => path.join(
  appname,
  'logs',
  process.env.NODE_ENV,
  `${type}.log`
)

const child = new (forever.Monitor)(
  path.join(__dirname, '../src/start.js'),
  {
    silent: false,
    watch: false,
    max: 10,
    logFile: logpath('forever'),
    outFile: logpath('stdout'),
    errFile: logpath('stderr'),
    cwd: process.cwd()
  }
)

child.on(
  'start',
  (process, data) => {
    logger.info(`App ${appname} started.`)
    logger.info('The app will be kept running, even if errors occur, until you stop it.')
    logger.info(`To stop the app run: ${colors.bold(`pubsweet stop ${appname}`)}`)
    logger.info(`To check the logs use: ${colors.bold(`pubsweet tail ${appname}`)}`)
    logger.info(`Or find the log files in ${appname}/logs/${process.env.NODE_ENV}/{forever, stdout, stderr}.log`)
  }
)

child.on(
  'stop',
  process => logger.info(`App ${appname} stopped (${process})`)
)

child.on(
  'restart',
  forever => logger.warn(`Forever restarting ${appname} for ${child.times} time`)
)

child.on(
  'exit:code',
  code => logger.error(`Forever detected script exited with code ${code}`)
)

child.on('error', logger.error)

child.start()
