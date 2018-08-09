/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { PostgresPubSub } = require('graphql-postgres-subscriptions')

module.exports = {
  /**
   * Pubsub object used in graphql subscriptions
   * to push messages back to the client.
   */
  pubsub: new PostgresPubSub(),
  /**
   * Iterators to listen to
   */
  asyncIterators: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}
