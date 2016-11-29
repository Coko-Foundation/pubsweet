#!/usr/bin/env node

const forever = require('forever-monitor')
const program = require('commander')
const logger = require('../src/logger')
const path = require('path')

program
  .option('--dev', 'Run in development mode')
  .option('--reduxlog-off', 'Switch off Redux logger')
  .description('Run the app at [path].')
  .parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'
process.env.REDUXLOG_OFF = program.reduxlogOff

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
    command: 'node',
    silent: false,
    watch: false,
    max: 10,
    logFile: logpath('forever'),
    outFile: logpath('stdout'),
    errFile: logpath('stderr'),
    cwd: process.cwd(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      REDUXLOG_OFF: process.env.REDUXLOG_OFF
    }
  }
)

child.on(
  'start',
  (proc, data) => {
    logger.info(`App ${appname} started.`)
    logger.info('The app will be kept running, even if errors occur, until you stop it.')
    logger.info('To stop the app use ctrl-C')
    logger.info(`Logs will be written to ${appname}/logs/${process.env.NODE_ENV}/{stdout, stderr}.log`)
  }
)

child.on(
  'stop',
  proc => logger.info(`App ${appname} stopped (${proc})`)
)

child.on(
  'restart',
  forever => logger.warn(`Restarting ${appname} for ${child.times} time`)
)

child.on(
  'exit:code',
  code => logger.error(`Detected ${appname} exited with code ${code}`)
)

child.on('error', err => logger.error(err.stack))

child.start()
