const reduce = require('lodash/fp/reduce').convert({cap: false})

module.exports = reduce((acc, value, key) => acc.concat(`--${key}`, value), [])
