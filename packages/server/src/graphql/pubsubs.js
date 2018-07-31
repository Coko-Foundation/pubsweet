/**
 * Object with a pubsub per client connection.
 *
 * This is used in graphql subscriptions to push
 * messages back to the client.
 *
 * The structure is pubsubs: { userId: PubSub object, ... }
 */
module.exports = {
  pubsubs: {},
}
