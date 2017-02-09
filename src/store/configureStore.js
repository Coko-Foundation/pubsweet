// Cross-platform global: https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/
(function (global) {
  global.CONFIG = require(process.env.APP_DIR + '/config/' + process.env.NODE_ENV)
  global.VALIDATIONS = require('pubsweet-backend/src/models/validations')(global.CONFIG)
}).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
