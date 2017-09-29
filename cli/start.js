const forever = require('forever-monitor')
const _ = require('lodash')
const config = require('config')
const logger = require('@pubsweet/logger')
const path = require('path')
const program = require('commander')
const { dbExists } = require('@pubsweet/db-manager')
const { ordinalize } = require('inflection')

const readCommand = async argsOverride => {
  program
    .option('--dev', 'Run in development mode')
    .option('--reduxlog-off', 'Switch off Redux logger (dev only)')
    .description('Run the app at [path].')

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)

  process.env.NODE_ENV = commandOpts.dev ? 'dev' : (process.env.NODE_ENV || 'production')

  logger.info('Starting PubSweet app')

  if (!await dbExists()) {
    throw new Error('Create database with "pubsweet setupdb" before starting app')
  }

  const executable = path.join(__dirname, '..', 'src', 'start', 'index.js')

  const defaultOpts = {
    silent: false,
    watch: true,
    // By default we'll restart the app when config is edited
    watchDirectory: path.join(process.cwd(), 'config'),
    // watchIgnorePatterns: ["./client-config.js"] // perhaps
    max: 10,
    env: _.clone(process.env)
  }

  const configOpts = config.has('forever') ? config.get('forever') : {}

  const overrideOpts = {
    env: {
      REDUXLOG_OFF: commandOpts.reduxlogOff
    }
  }

  const finalOpts = _.merge(defaultOpts, configOpts, overrideOpts)

  const child = forever.start(executable, finalOpts)

  child.on('start', () => {
    logger.info(`App started.`)
    logger.info('The app will be kept running, even if errors occur, until you stop it.')
    logger.info('To stop the app use ctrl-C')
  })

  child.on('stop', proc => {
    logger.info(`App stopped (${proc})`)
  })

  child.on('restart', () => {
    logger.warn(ordinalize(`Restarting app for ${child.times} time`))
  })

  child.on('exit:code', code => {
    logger.error(`App exited with code ${code}`)
  })

  child.on('error', err => {
    logger.error(err.stack)
    throw err
  })

  return child
}
