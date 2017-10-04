const path = require('path')
const logger = require('@pubsweet/logger')
const config = require('config')

module.exports = app => {
  if (config.has('pubsweet.components')) {
    config.get('pubsweet.components').forEach(name => {
      const component = require(name)
      logger.info('Registered component', name)

      if (component.server || component.backend) {
        (component.server || component.backend)()(app)
        logger.info('Registered server component', name)
      }
    })
  }
}
