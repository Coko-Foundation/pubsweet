const logger = require('@pubsweet/logger')
const config = require('config')

const tryRequireRelative = require('./helpers/tryRequireRelative')

module.exports = app => {
  logger.info(`Registering data loaders...`)
  const loaders = config
    .get('pubsweet.components')
    .reduce((acc, componentName) => {
      const component = tryRequireRelative(componentName)
      if (component.loaders) {
        return {
          ...acc,
          [componentName.replace('component-', '')]: component.loaders,
        }
      }
      return acc
    }, {})

  app.use((req, res, next) => {
    req.loaders = loaders
    next()
  })
}
