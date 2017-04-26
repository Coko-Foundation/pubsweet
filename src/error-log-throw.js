const logger = require('./logger')

module.exports = msg => err => {
  logger.error(msg)
  throw err
}
