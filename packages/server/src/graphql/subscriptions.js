/**
 * subscription (websocket) server for GraphQL
 */
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const config = require('config')
const logger = require('@pubsweet/logger')

const graphqlSchema = require('./schema')
const { token } = require('../authentication')

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
          onConnect: (connectionParams, webSocket, context) => {
            if (!connectionParams.authToken) {
              throw new Error('Missing auth token')
            }
            return new Promise((resolve, reject) => {
              token.verify(connectionParams.authToken, (_, id) => {
                if (!id) {
                  logger.info('Bad auth token')
                  reject(new Error('Bad auth token'))
                }
                resolve({ user: id })
              })
            })
          },
        },
        {
          server: websocketServer,
          path: '/subscriptions',
        },
      )
    })
  },
}
