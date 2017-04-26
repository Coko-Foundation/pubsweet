const logger = require('./logger')

module.exports = err => {
  if (err) logger.error(err.stack)
  process.exit(1)
}
