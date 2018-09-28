/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { PostgresPubSub } = require('graphql-postgres-subscriptions')
const config = require('config')
const pg = require('pg')

const connection = config['pubsweet-server'] && config['pubsweet-server'].db

const ignoreTerminatedError =
  config.has('pubsweet-server.ignoreTerminatedConnectionError') &&
  config.get('pubsweet-server.ignoreTerminatedConnectionError')

let pubsub
let client

module.exports = {
  /**
   * Pubsub object used in graphql subscriptions
   * to push messages back to the client.
   */
  getPubsub: async () => {
    if (pubsub) return pubsub
    client = new pg.Client(connection)
    // ignore some errors which are thrown in integration tests
    if (ignoreTerminatedError) {
      client.on('error', async err => {
        if (
          err.message !==
            'terminating connection due to administrator command' &&
          err.message !== 'Connection terminated unexpectedly'
        ) {
          throw err
        }
      })
    }
    await client.connect()
    pubsub = new PostgresPubSub({ client })
    if (ignoreTerminatedError) {
      pubsub.subscribe('error', () => {})
    }
    return pubsub
  },

  destroy: () => {
    if (client) {
      pubsub = null
      return client.end()
    }
    return Promise.resolve()
  },

  /**
   * Iterators to listen to
   */
  asyncIterators: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}
