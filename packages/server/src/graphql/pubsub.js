/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { PostgresPubSub } = require('graphql-postgres-subscriptions')

const db = require('../db')

let pubsub

module.exports = {
  /**
   * Pubsub object used in graphql subscriptions
   * to push messages back to the client.
   */
  getPubsub: async () => {
    if (pubsub) return pubsub
    const client = await db.connect()
    pubsub = new PostgresPubSub({ client })
    return pubsub
  },
  /**
   * Iterators to listen to
   */
  asyncIterators: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}
