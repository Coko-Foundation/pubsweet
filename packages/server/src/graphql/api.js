const passport = require('passport')
const { ApolloServer } = require('apollo-server-express')
const logger = require('@pubsweet/logger')
const errors = require('@pubsweet/errors')

const config = require('config')

const schema = require('./schema')
const connectors = require('../connectors')

const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], {
  session: false,
})

const helpers = require('../helpers/authorization')

const hostname = config.has('pubsweet-server.hostname')
  ? config.get('pubsweet-server.hostname')
  : 'localhost'

const api = app => {
  app.use('/graphql', authBearerAndPublic)
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      user: req.user,
      connectors,
      helpers,
    }),
    formatError: err => {
      const error = err.originalError || err

      logger.error(error.message, { error })

      const isPubsweetDefinedError = Object.values(errors).some(
        pubsweetError => error instanceof pubsweetError,
      )
      // err is always a GraphQLError which should be passed to the client
      if (
        Object.keys(err.originalError).length !== 0 &&
        !isPubsweetDefinedError
      )
        return {
          name: 'Server Error',
          message: 'Something went wrong! Please contact your administrator',
        }

      return {
        name: error.name || 'GraphQLError',
        message: error.message,
        extensions: {
          code: err.extensions.code,
        },
      }
    },
    playground: {
      subscriptionEndpoint: `ws://${hostname}:3000/subscriptions`,
    },
  })
  server.applyMiddleware({ app })
}

module.exports = api
