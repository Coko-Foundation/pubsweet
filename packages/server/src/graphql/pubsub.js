/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { RedisPubSub } = require('graphql-redis-subscriptions')

module.exports = {
  /**
   * Pubsub object used in graphql subscriptions
   * to push messages back to the client.
   */
  pubsub: new RedisPubSub(),
  /**
   * Iterators to listen to
   */
  asyncIterators: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}
