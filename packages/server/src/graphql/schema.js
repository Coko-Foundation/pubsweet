const config = require('config')
const requireRelative = require('require-relative')
const { merge } = require('lodash')
const { makeExecutableSchema } = require('graphql-tools')

const collection = require('./definitions/collection')
const fragment = require('./definitions/fragment')
const team = require('./definitions/team')
const user = require('./definitions/user')
const authentication = require('./definitions/authentication')

// load base types and resolvers
const typeDefs = [
  `type Query, type Mutation`,
  collection.typeDefs,
  fragment.typeDefs,
  team.typeDefs,
  user.typeDefs,
  authentication.typeDefs,
]
const resolvers = merge(
  {},
  collection.resolvers,
  fragment.resolvers,
  team.resolvers,
  user.resolvers,
  authentication.resolvers,
)

// merge in component types and resolvers
if (config.has('pubsweet.components')) {
  config.get('pubsweet.components').forEach(name => {
    const component = requireRelative(name)
    if (component.typeDefs) {
      typeDefs.push(component.typeDefs)
    }
    if (component.resolvers) {
      merge(resolvers, component.resolvers)
    }
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
