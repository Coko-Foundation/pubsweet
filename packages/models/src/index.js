const config = require('config')

const models = {}

Object.keys(models).forEach((key, _) => {
  module.exports[key] = require(models[key])
})

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

// custom data models
if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(componentName => {
    const component = requireRelative(componentName)

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
