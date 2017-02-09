var global = require('global')
global.CONFIG = require(process.env.APP_DIR + '/config/' + process.env.NODE_ENV)
global.VALIDATIONS = require('pubsweet-backend/src/models/validations')(global.CONFIG)

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
