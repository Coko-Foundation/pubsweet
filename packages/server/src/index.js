module.exports.pubsubManager = require('./graphql/pubsub')

module.exports.startServer = require('./start-server')

// Authorization helpers
// All models are loaded here, be careful with circular dependencies
module.exports.helpers = require('./helpers/authorization')
module.exports.util = require('./routes/util')

// Jobs queue
module.exports.jobs = {
  connectToJobQueue: require('./jobs').connectToJobQueue,
}
