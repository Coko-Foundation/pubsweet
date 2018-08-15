/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { PostgresPubSub } = require('graphql-postgres-subscriptions')

const db = require('../db')

module.exports = {
  /**
   * Pubsub object used in graphql subscriptions
   * to push messages back to the client.
   */
  getPubsub: async () => {
    const client = await db.connect()
    return new PostgresPubSub({ client })
  },
  /**
   * Iterators to listen to
   */
  asyncIterators: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}
