const config = require('config').get('pubsweet-server')
const defaultLogger = require('./validate-config')(config.logger)

const defaultLoggerMap = {
  'console': () => {
    global.console.debug = (...args) => console.log(...args)
    return global.console
  },
  winston: () => require('winston'),
  bunyan: () => require('bunyan').createLogger({ name: 'pubsweet-logger' })
}

let logger = defaultLoggerMap[defaultLogger]()

module.exports = {
  error: (...args) => logger.error(...args),
  warn: (...args) => logger.warn(...args),
  info: (...args) => logger.info(...args),
  debug: (...args) => logger.debug(...args),
  stream: {
    write: function (message, encoding) {
      logger.info(message)
    }
  },
  configure: (theirLogger) => {
    if (typeof (theirLogger.error) !== 'function' ||
        typeof (theirLogger.warn) !== 'function' ||
        typeof (theirLogger.info) !== 'function' ||
        typeof (theirLogger.debug) !== 'function'
    ) {
      throw new Error('Logger must implement "error", "warn", "info" and "debug" functions')
    }

    logger = theirLogger
  },
  getRawLogger: () => logger
}
