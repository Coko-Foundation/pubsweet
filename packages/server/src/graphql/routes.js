const express = require('express')
const passport = require('passport')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { apolloUploadExpress } = require('apollo-upload-server')
const logger = require('@pubsweet/logger')
const errors = require('@pubsweet/errors')

const config = require('config')

const graphqlSchema = require('./schema')
const connectors = require('../connectors')

const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], {
  session: false,
})
const router = new express.Router()

const helpers = require('../helpers/authorization')

const hostname = config.has('pubsweet-server.hostname')
  ? config.get('pubsweet-server.hostname')
  : 'localhost'
router.use(
  '/graphql',
  authBearerAndPublic,
  apolloUploadExpress(),
  graphqlExpress(req => ({
    schema: graphqlSchema,
    context: { user: req.user, connectors, helpers },
    formatError: err => {
      const error = err.originalError || err

      logger.error(error.message, { error })

      const isPubsweetDefinedError = Object.values(errors).some(
        pubsweetError => error instanceof pubsweetError,
      )

      // err is always a GraphQLError which should be passed to the client
      if (err.originalError && !isPubsweetDefinedError)
        return {
          name: 'Server Error',
          message: 'Something went wrong! Please contact your administrator',
        }

      return {
        name: error.name,
        message: error.message,
      }
    },
  })),
)
if (
  config.has('pubsweet-server.graphiql') &&
  config.get('pubsweet-server.graphiql')
) {
  router.get(
    '/graphiql',
    authBearerAndPublic,
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://${hostname}:3000/subscriptions`,
    }),
  )
}

module.exports = router
