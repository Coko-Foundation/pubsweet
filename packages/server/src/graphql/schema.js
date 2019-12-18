const config = require('config')
const { merge } = require('lodash')
const { makeExecutableSchema } = require('apollo-server-express')

const { applyMiddleware } = require('graphql-middleware') // new dependency
const middlewareList = require('') // config or components.json maybe

const upload = require('./definitions/upload')

const tryRequireRelative = require('../helpers/tryRequireRelative')

// load base types and resolvers
const typeDefs = [
  `type Query, type Mutation, type Subscription`,
  upload.typeDefs,
]

const resolvers = merge({}, upload.resolvers)

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

// add middleware to schema, that is all that should be needed
const schema = makeExecutableSchema({ typeDefs, resolvers })
const schemaWithMiddleware = applyMiddleware(schema, ...middlewareList)
module.exports = schemaWithMiddleware
