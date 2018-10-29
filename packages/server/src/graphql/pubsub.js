/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { PostgresPubSub } = require('graphql-postgres-subscriptions')
const config = require('config')

const dbOptions = config['pubsweet-server'] && config['pubsweet-server'].db
const ignoreTerminatedError =
  config.has('pubsweet-server.ignoreTerminatedConnectionError') &&
  config.get('pubsweet-server.ignoreTerminatedConnectionError')

let pubsub

const pubsubManager = {
  /**
   * Pubsub object used in graphql subscriptions
   * to push messages back to the client.
   */
  connect: () => {
    if (pubsub) return pubsub
    pubsub = new PostgresPubSub(dbOptions)
    // ignore some errors which are thrown in integration tests
    if (ignoreTerminatedError) {
      pubsub.client.on('error', err => {
        if (
          err.message !==
            'terminating connection due to administrator command' &&
          err.message !== 'Connection terminated unexpectedly'
        ) {
          throw err
        }
      })
    }
    return pubsub
  },

  /**
   * @param drain {boolean} whether to wait for the database client to emit 'drain' before closing
   * @returns {Promise<void>}
   */
  destroy: async ({ drain } = {}) => {
    if (pubsub) {
      if (drain) {
        await new Promise(resolve => pubsub.client.on('drain', resolve))
      }
      await pubsub.client.end()
      pubsub = null
    }
  },

  /**
   * Iterators to listen to
   */
  channelNames: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}

module.exports = pubsubManager
