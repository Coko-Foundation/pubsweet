const express = require('express')
const passport = require('passport')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { apolloUploadExpress } = require('apollo-upload-server')

const config = require('config')

const graphqlSchema = require('./schema')
const connectors = require('../connectors')

const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], {
  session: false,
})
const router = new express.Router()

router.use(
  '/graphql',
  authBearerAndPublic,
  apolloUploadExpress(),
  graphqlExpress(req => ({
    schema: graphqlSchema,
    context: { user: req.user, connectors },
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
      subscriptionsEndpoint: `ws://localhost:5000/subscriptions`,
    }),
  )
}

module.exports = router
