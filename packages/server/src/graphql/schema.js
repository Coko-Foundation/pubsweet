const config = require('config')
const { merge } = require('lodash')
const { makeExecutableSchema } = require('apollo-server-express')

const upload = require('./definitions/upload')

const tryRequireRelative = require('../helpers/tryRequireRelative')

const enableBaseTypesAndResolvers = config.has(
  'pubsweet-server.apollo.enableBaseTypesAndResolvers',
)
  ? config.get('pubsweet-server.apollo.enableBaseTypesAndResolvers')
  : true

// load base types and resolvers
const typeDefs = enableBaseTypesAndResolvers
  ? [`type Query, type Mutation, type Subscription`, upload.typeDefs]
  : []

const resolvers = enableBaseTypesAndResolvers ? merge({}, upload.resolvers) : {}

// recursively merge in component types and resolvers
function getSchemaRecursively(componentName) {
  const component = tryRequireRelative(componentName)

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

function getSchema() {
  return config.has('pubsweet-server.apollo.schemaFactory')
    ? config.get('pubsweet-server.apollo.schemaFactory')({
        typeDefs,
        resolvers,
      })
    : makeExecutableSchema({ typeDefs, resolvers })
}

module.exports = { getSchema }
