const express = require('express')
const passport = require('passport')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
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
    graphiqlExpress({ endpointURL: '/graphql' }),
  )
}

module.exports = router
