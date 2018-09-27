const config = require('config')

const connector = require('./connector')
const models = require('../models')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

const connectors = {
  Collection: connector('Collection', models.Collection),
  Fragment: connector('Fragment', models.Fragment),
  Team: connector('Team', models.Team),
  User: connector('User', models.User),
}

// merge in component connectors, recursively
function getConnectorsRecursively(componentName) {
  const component = requireRelative(componentName)

  if (component.modelName) {
    connectors[component.modelName] = connector(
      component.modelName,
      models[component.modelName],
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
