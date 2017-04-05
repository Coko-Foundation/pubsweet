'use strict'

const path = require('path')
const winston = require('winston')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: path.join(__dirname, '..', 'logs', 'pubsweet_' + process.env.NODE_ENV + '.log')
    }),
    new (winston.transports.Console)({
      colorize: true
    })
  ]
})

logger.stream = {
  write: message => {
    logger.info(message)
  }
}

module.exports = logger
