let logger = console
logger.debug = console.log

module.exports = {
  error: logger.error,
  warn: logger.warn,
  info: logger.info,
  debug: logger.debug,
  configure: (theirLogger) => {
    // check all functions exist
    logger = theirLogger
  }
}
