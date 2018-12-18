const config = require('config')
const { merge } = require('lodash')
const { makeExecutableSchema } = require('graphql-tools')

const upload = require('./definitions/upload')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

// load base types and resolvers
const typeDefs = [
  `type Query, type Mutation, type Subscription`,
  upload.typeDefs,
]

const resolvers = merge({}, upload.resolvers)

// recursively merge in component types and resolvers
function getSchemaRecursively(componentName) {
  const component = requireRelative(componentName)

  if (component.extending) {
    getSchemaRecursively(component.extending)
  }

  if (component.typeDefs) {
    typeDefs.push(component.typeDefs)
  }
  if (component.resolvers) {
    merge(resolvers, component.resolvers)
  }
}

if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(componentName => {
    getSchemaRecursively(componentName)
  })
}

// merge in app-specific types and resolvers from config
if (config.has('pubsweet-server.typeDefs')) {
  typeDefs.push(config.get('pubsweet-server.typeDefs'))
}
if (config.has('pubsweet-server.resolvers')) {
  merge(resolvers, config.get('pubsweet-server.resolvers'))
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
