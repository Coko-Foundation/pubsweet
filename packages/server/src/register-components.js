const logger = require('@pubsweet/logger')
const config = require('config')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

module.exports = app => {
  if (config.has('pubsweet.components')) {
    config.get('pubsweet.components').forEach(name => {
      const component = requireRelative(name)
      logger.info('Registered component', name)
      const serverComponent = component.server || component.backend
      if (serverComponent) {
        serverComponent()(app)
        logger.info('Registered server component', name)
      }
    })
  }
}
