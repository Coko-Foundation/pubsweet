const config = require('config')
const logger = require('@pubsweet/logger')

const models = {}

Object.keys(models).forEach((key, _) => {
  module.exports[key] = require(models[key])
})

const tryRequireRelative = m => {
  let component
  try {
    component = require(require.resolve(m, { paths: [process.cwd()] }))
  } catch (err) {
    logger.warn(
      `Unable to load component ${m} on the server (likely a client component).`,
    )
    component = {}
  }
  return component
}

// custom data models
if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(componentName => {
    const component = tryRequireRelative(componentName)

    // Backwards compatible with single model
    if (component.modelName) {
      module.exports[component.modelName] = component.model
    }

    // Multiple models in one component using this syntax:
    // models: [
    //   { modelName: 'Team', model: require('./team') },
    //   { modelName: 'TeamMember', model: require('./team_member') },
    //   { modelName: 'Alias', model: require('./alias') },
    // ],
    if (component.models) {
      component.models.forEach(model => {
        module.exports[model.modelName] = model.model
      })
    }
  })
}
