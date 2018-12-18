const logger = require('@pubsweet/logger')
const config = require('config')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

const registerRecursively = (app, componentName) => {
  const component = requireRelative(componentName)
  logger.info('Registered component', componentName)
  const serverComponent = component.server || component.backend
  if (serverComponent) {
    serverComponent()(app)
    logger.info('Registered server component', componentName)
  }
  if (component.extending) {
    registerRecursively(app, component.extending)
  }
}

module.exports = app => {
  if (config.has('pubsweet.components')) {
    config.get('pubsweet.components').forEach(componentName => {
      registerRecursively(app, componentName)
    })
  }
}
