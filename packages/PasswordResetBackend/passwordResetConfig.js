const config = require('config')

const options = config.get('password-reset')

if (!options) {
  throw new Error("config 'password-reset' not set")
}

if (!options['url']) {
  throw new Error("config 'password-reset.url' not set")
}

if (!options['sender']) {
  throw new Error("config 'password-reset.sender' not set")
}

if (!options['token-length']) {
  options['token-length'] = 32 // default
}

module.exports = options
