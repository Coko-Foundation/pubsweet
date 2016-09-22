'use strict'

const winston = require('winston')

var logger

if (process.env.NODE_ENV !== 'test') {
  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ colorize: true })
    ]
  })
} else {
  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'test.log' })
    ]
  })
}

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

module.exports = logger
