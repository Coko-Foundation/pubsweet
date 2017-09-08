const forever = require('forever-monitor')
const logger = require('@pubsweet/logger')
const path = require('path')
const program = require('commander')

module.exports = async args => {
  program
    .option('--dev', 'Run in development mode')
    .option('--reduxlog-off', 'Switch off Redux logger (dev only)')
    .option('--watch [path]', 'Watch path for changes (dev only)', collect, [])
    .description('Run the app at [path].')

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  const appPath = path.resolve(program.args[0] || process.cwd())

  logger.info('Starting PubSweet app:', appPath)
  await require('../src/check-exists')(appPath)
  await require('../src/check-db')(appPath)
  await require('../src/chdir')(appPath)

  const cmd = ['node', path.join(__dirname, '../src/start.js')]

  if (program.dev && program.watch) {
    program.watch.forEach(path => {
      cmd.push(`--watch ${path}`)
    })
  }

  return start(appPath, cmd)
}

const collect = (val, memo) => {
  memo.push(val)
  return memo
}

const start = async (appPath, cmd) => {
  const env = process.env.NODE_ENV

  const child = forever.start(cmd, {
    silent: false,
    watch: false,
    max: 10,
    cwd: appPath,
    env: {
      NODE_ENV: env,
      REDUXLOG_OFF: program.reduxlogOff,
      NODE_CONFIG_DIR: path.join(appPath, 'config')
    }
  })

  child.on('start', () => {
    logger.info(`App ${appPath} started.`)
    logger.info('The app will be kept running, even if errors occur, until you stop it.')
    logger.info('To stop the app use ctrl-C')
  })

  child.on('stop', proc => {
    logger.info(`App ${appPath} stopped (${proc})`)
  })

  child.on('restart', () => {
    logger.warn(`Restarting ${appPath} for ${child.times} time`)
  })

  child.on('exit:code', code => {
    logger.error(`Detected ${appPath} exited with code ${code}`)
  })

  child.on('error', err => {
    logger.error(err.stack)
    throw err
  })

  return child
}
