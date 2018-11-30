module.exports.db = require('./db')

module.exports.pubsubManager = require('./graphql/pubsub')
module.exports.NotFoundError = require('./errors/NotFoundError')
module.exports.ConflictError = require('./errors/ConflictError')
module.exports.ValidationError = require('./errors/ValidationError')
module.exports.AuthorizationError = require('./errors/AuthorizationError')

module.exports.startServer = require('./start-server')

// Authorization helpers
// All models are loaded here, be careful with circular dependencies
module.exports.helpers = require('./helpers/authorization')
module.exports.util = require('./routes/util')

// Core models
module.exports.Collection = require('./models/Collection')

// Jobs queue
module.exports.jobs = {
  connectToJobQueue: require('./jobs').connectToJobQueue,
}
