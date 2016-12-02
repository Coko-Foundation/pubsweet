'use strict'

const winston = require('winston')

var logger

var normalTransports = [
  new (winston.transports.File)({ filename: 'pubsweet.log' })
]

if (!process.env.PUBSWEET_BACKEND_SILENT) {
  normalTransports.push(new (winston.transports.Console)())
}

if (process.env.NODE_ENV !== 'test') {
  logger = new (winston.Logger)({
    transports: normalTransports
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
