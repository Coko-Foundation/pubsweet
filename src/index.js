import configureStore from './store/configureStore'
import Root from './components/Root'

// Cross-platform global: https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/
(function (global) {
  global.VALIDATIONS = require('pubsweet-backend/src/models/validations')(CONFIG)
}).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})

export { configureStore, Root }
