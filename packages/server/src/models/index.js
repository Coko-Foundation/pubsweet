const models = {
  Collection: './Collection',
  Fragment: './Fragment',
  User: './User',
  Team: './Team',
}

const config = require('config')

if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(name => {
    const component = require(name)
    if (component.model) {
      module.exports[component.modelName] = component.model
    }
  })
}

Object.keys(models).forEach((key, _) => {
  module.exports[key] = require(models[key])
})
