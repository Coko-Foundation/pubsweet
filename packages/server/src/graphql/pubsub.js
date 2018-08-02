/**
 * PubSub related stuff used in GraphQL subscriptions
 */
const { RedisPubSub } = require('graphql-redis-subscriptions')

module.exports = {
  /**
   * Object with a pubsub per client connection.
   *
   * This is used in graphql subscriptions to push
   * messages back to the client.
   *
   * The structure is pubsubs: { userId: PubSub object, ... }
   */
  pubsub: new RedisPubSub(),
  /**
   * Iterators to listen to
   */
  asyncIterators: {
    ON_UPLOAD_PROGRESS: 'ON_UPLOAD_PROGRESS',
  },
}
