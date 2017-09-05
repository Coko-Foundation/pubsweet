'use strict'

const path = require('path')
const winston = require('winston')

const logger = new (winston.Logger)({
  transports: [
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
