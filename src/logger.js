'use strict'

const winston = require('winston')
const config = require('config')

let transports = []

// write to the console if not silent and not testing
if (!config.get('pubsweet-server.silent')) {
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