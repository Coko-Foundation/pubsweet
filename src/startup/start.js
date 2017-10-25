const express = require('express')
const requireRelative = require('require-relative')
// this script run from global install needs to use an app's local pubsweet-server.
const startServer = requireRelative('pubsweet-server')

const { build } = require('./build')
const onError = require('../error-exit')

const start = async () => {
  const rawApp = express()
  await build(rawApp)
  const server = await startServer(rawApp)
  server.on('error', onError)
  return server
}

if (require.main === module) { // file is being executed
  start()
} else {
  module.exports = start
}
