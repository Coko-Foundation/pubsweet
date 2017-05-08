const forever = require('forever-monitor')
const logger = require('../src/logger')
const path = require('path')
const program = require('commander')

const collect = (val, memo) => memo.push(val) && memo

module.exports = args => {

  program
    .option('--dev', 'Run in development mode')
    .option('--reduxlog-off', 'Switch off Redux logger (dev only)')
    .option('--watch [path]', 'Watch path for changes (dev only)', collect, [])
    .description('Run the app at [path].')

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  const appPath = path.resolve(program.args[0] || process.cwd())

  logger.info('Starting PubSweet app:', appPath)

  const makecmd = () => {
    let cmd = `node ${path.join(__dirname, '../src/start.js')}`
    if (program.dev && program.watch && program.watch.length > 0) {
      program.watch.forEach(path => {
        cmd += ` --watch ${path}`
      })
    }
    return cmd.split(' ')
  }

  const logpath = type => path.join(
    appPath,
    'logs',
    process.env.NODE_ENV,
    `${type}.log`
  )

  const spawn = () => {
    const child = forever.start(
      makecmd(),
      {
        silent: false,
        watch: false,
        max: 10,
        logFile: logpath('forever'),
        outFile: logpath('stdout'),
        errFile: logpath('stderr'),
        cwd: appPath,
        env: {
          NODE_ENV: process.env.NODE_ENV,
          REDUXLOG_OFF: program.reduxlogOff,
          NODE_CONFIG_DIR: path.join(appPath, 'config')
        }
      }
    )

    child.on(
      'start',
      () => {
        logger.info(`App ${appPath} started.`)
        logger.info('The app will be kept running, even if errors occur, until you stop it.')
        logger.info('To stop the app use ctrl-C')
        logger.info(`Logs will be written to ${appPath}/logs/${process.env.NODE_ENV}/{stdout, stderr}.log`)
      }
    )

    child.on(
      'stop',
      proc => logger.info(`App ${appPath} stopped (${proc})`)
    )

    child.on(
      'restart',
      () => logger.warn(`Restarting ${appPath} for ${child.times} time`)
    )

    child.on(
      'exit:code',
      code => logger.error(`Detected ${appPath} exited with code ${code}`)
    )

    child.on('error', err => logger.error(err.stack))

    return child
  }

  const run = async () => {
    await require('../src/check-exists')(appPath)()
    await require('../src/check-db')(appPath)()
    await require('../src/chdir')(appPath)()
    return spawn()
  }

  return run()
}
