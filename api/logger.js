'use strict'

const winston = require('winston')

var logger

if (process.env.NODE_ENV !== 'test') {
  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'pubsweet.log' })
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
