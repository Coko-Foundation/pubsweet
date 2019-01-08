const config = require('config')

const connector = require('./connector')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

const connectors = {}

// merge in component connectors, recursively
function getConnectorsRecursively(componentName) {
  const component = requireRelative(componentName)
  if (component.modelName) {
    connectors[component.modelName] = connector(
      component.modelName,
      component.model,
    )
  }

  if (component.extending) {
    getConnectorsRecursively(component.extending)
  }
}

// recursively merge in component types and resolvers
if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(componentName => {
    getConnectorsRecursively(componentName)
  })
}

module.exports = connectors
