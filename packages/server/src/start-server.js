const http = require('http')
const config = require('config')
const Promise = require('bluebird')
const logger = require('@pubsweet/logger')

const { addSubscriptions } = require('./graphql/subscriptions')

const startServer = async app => {
  const port =
    config['pubsweet-server'].port ||
    /* deprecated:--> */ process.env.PORT ||
    3000
  app.set('port', port)
  const server = http.createServer(app)
  logger.info(`Starting HTTP server`)
  const startListening = Promise.promisify(server.listen, { context: server })
  await startListening(port)
  logger.info(`App is listening on port ${port}`)
  addSubscriptions(server)
  return server
}

module.exports = startServer
