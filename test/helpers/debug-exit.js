// TODO: unused?

const logger = require('../../src/logger')

process.stdin.resume()

const exitHandler = (options, err) => {
  if (options.cleanup && !err) {
    logger.info('Exiting without error')
  }

  if (options.exit) {
    if (options.user) {
      logger.info('Exiting at user request (ctrl-c)')
    }

    process.exit()
  } else if (err) {
    logger.error('Uncaught error (exit prevented): ', err)
  }
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, { exit: false }))

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true, user: true }))

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: false }))

// catches uncaught exceptions
process.on('unhandledRejection', (reason, p) => {
  exitHandler({ exit: false }, { reason: reason, promise: p })
})
