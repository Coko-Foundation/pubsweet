'use strict'

const winston = require('winston')
const config = require('config')
const get = require('lodash/get')

let transports = []

// write to the console if not silent and not testing
if (!get(config, 'pubsweet-server.silent', false)) {
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
