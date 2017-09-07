'use strict'

const winston = require('winston')

let transports = []

// write to the console if not silent and not testing
if (!process.env.PUBSWEET_BACKEND_SILENT) {
  if (process.env.NODE_ENV !== 'test') {
    transports.push(new (winston.transports.Console)())
  }
}

const logger = new (winston.Logger)({ transports })

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

module.exports = logger
