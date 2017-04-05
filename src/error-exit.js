const logger = require('./logger')

module.exports = err => {
  logger.error(err.stack)
  process.exit(1)
}
