process.env.SUPPRESS_NO_CONFIG_WARNING = true

const config = require('config')
const validations = require('./validations')

let loggerConfig
if (config.has('pubsweet-server')) {
  loggerConfig = config.get('pubsweet-server').logger
}

let logger = validations.validateConfig(loggerConfig)
let configured = Boolean(logger)

if (!configured) {
  global.console.debug = (...args) => global.console.log(args)
  logger = global.console
}

module.exports = {
  error: (...args) => logger.error(...args),
  warn: (...args) => logger.warn(...args),
  info: (...args) => logger.info(...args),
  debug: (...args) => logger.debug(...args),
  stream: {
    write(message, encoding) {
      logger.info(message)
    },
  },
  configure: theirLogger => {
    if (configured) {
      throw new Error('Logger has already been configured')
    }

    validations.validateConfig(theirLogger)

    logger = theirLogger
    configured = true
  },
  getRawLogger: () => logger,
}
