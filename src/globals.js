// Cross-platform global: https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/

(function (global) {
  global.VALIDATIONS = require('pubsweet-server/src/models/validations')(CONFIG)
}).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
