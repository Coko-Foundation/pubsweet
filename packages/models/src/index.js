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
    if (component.modelName) {
      module.exports[component.modelName] = component.model
    }
  })
}
