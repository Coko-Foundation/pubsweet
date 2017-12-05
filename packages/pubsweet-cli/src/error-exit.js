const logger = require('@pubsweet/logger')

module.exports = err => {
  if (err) logger.error(err.stack)
  process.exit(1)
}
