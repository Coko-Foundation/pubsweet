const config = require('config')

const connector = require('./connector')

const tryRequireRelative = require('../helpers/tryRequireRelative')

const connectors = {}

// merge in component connectors, recursively
function getConnectorsRecursively(componentName) {
  const component = tryRequireRelative(componentName)
  // Backwards compatible for single model syntax
  if (component.extending) {
    getConnectorsRecursively(component.extending)
  }

  if (component.modelName) {
    connectors[component.modelName] = connector(
      component.modelName,
      component.model,
    )
  }

  // It is currently not possible to extend a component
  // that has multiple models. But models in a multiple
  // component model can extend other single model components.
  if (component.models) {
    component.models.forEach(model => {
      if (model.extending) {
        getConnectorsRecursively(model.extending)
      }
      connectors[model.modelName] = connector(model.modelName, model.model)
    })
  }
}

// recursively merge in component types and resolvers
if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(componentName => {
    getConnectorsRecursively(componentName)
  })
}

module.exports = connectors
