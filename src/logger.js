'use strict'

const path = require('path')
const winston = require('winston')

// write to a log file per environment
let transports = [
  new (winston.transports.File)({
    filename: path.join(__dirname, '..', 'logs', 'pubsweet_' + process.env.NODE_ENV + '.log')
  })
]

// write to the console if not silent and not testing
if (!process.env.PUBSWEET_BACKEND_SILENT) {
  if (process.env.NODE_ENV !== 'test') {
    transports.push(new (winston.transports.Console)())
  }
}

const logger = new (winston.Logger)({
  transports: transports
})

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

module.exports = logger
