const logger = require('@pubsweet/logger')
const config = require('config')
console.log(config)

module.exports = app => {
  if (config.has('pubsweet.components')) {
    config.get('pubsweet.components').forEach(name => {
      const component = require(name)
      logger.info('Registered component', name)
      const backendComponent = component.server || component.backend
      if (backendComponent) {
        backendComponent()(app)
        logger.info('Registered server component', name)
      }
    })
  }
}
