#!/usr/bin/env node

const forever = require('forever-monitor')
const program = require('commander')
const logger = require('../src/logger')
const fs = require('fs')
const path = require('path')

const collect = (val, memo) => memo.push(val) && memo

program
  .option('--dev', 'Run in development mode')
  .option('--reduxlog-off', 'Switch off Redux logger (dev only)')
  .option('--watch [path]', 'Watch path for changes (dev only)', collect, [])
  .description('Run the app at [path].')
  .parse(process.argv)

process.env.NODE_ENV = program.dev ? 'dev' : 'production'
process.env.REDUXLOG_OFF = program.reduxlogOff

let appname = program.args[0]
if (!appname) appname = process.cwd()
appname = path.resolve(appname)

const dbCheckPath = path.join(appname, 'api', 'db', process.env.NODE_ENV, 'CURRENT')

const checkExists = () => new Promise(
  (resolve, reject) => {
    fs.stat(appname, (err, stats) => {
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

const makecmd = () => {
  let cmd = `node ${path.join(__dirname, '../src/start.js')}`
  if (program.dev && program.watch && program.watch.length > 0) {
    program.watch.forEach(path => {
      cmd += ` --watch ${path}`
    })
  }
  return cmd.split(' ')
}

checkExists().then(
  checkDb
).then(
  () => {
    process.chdir(appname)

    require('../src/load-config')(path.resolve('', './config'))

    logger.info('Starting PubSweet app:', appname)

    const logpath = type => path.join(
      appname,
      'logs',
      process.env.NODE_ENV,
      `${type}.log`
    )

    const child = forever.start(
      makecmd(),
      {
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
  }
).catch(
  require('../src/error-exit')
)
