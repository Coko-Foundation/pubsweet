const path = require('path')
const logger = require('./logger')
const config = require(path.join(process.cwd(), 'config/' + process.env.NODE_ENV))

module.exports = app => {
  config.pubsweet.components.forEach(name => {
    const component = require(path.join(process.cwd(), 'node_modules', name))
    logger.info('Registered component', name)

    if (component.server || component.backend) {
      (component.server || component.backend)()(app)
      logger.info('Registered server component', name)
    }
  })
}
