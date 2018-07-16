/**
 * subscription (websocket) server for GraphQL
 */
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const config = require('config')
const logger = require('@pubsweet/logger')

const graphqlSchema = require('./schema')

const port = config.has('pubsweet-server.wsPort')
  ? config.get('pubsweet-server.wsPort')
  : process.env.WS_PORT || 5000

const websocketServer = createServer((req, res) => {
  res.writeHead(404)
  res.end()
})

module.exports = {
  startWebsocketServer: () => {
    websocketServer.listen(port, () => {
      logger.info(`WebSocket Server is listening on port ${port}`)
      SubscriptionServer.create(
        {
          schema: graphqlSchema,
          execute,
          subscribe,
        },
        {
          server: websocketServer,
          path: '/subscriptions',
        },
      )
    })
  },
}
