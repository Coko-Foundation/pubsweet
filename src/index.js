let logger = console
logger.debug = (...args) => console.log(...args)

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
