const express = require('express')
const { build } = require('./build')
const onError = require('../error-exit')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

// this script run from global install needs to use an app's local pubsweet-server.
const { startServer } = requireRelative('pubsweet-server')

const start = async () => {
  const rawApp = express()
  await build(rawApp)
  const startedServer = await startServer(rawApp)
  startedServer.on('error', onError)
  return startedServer
}

if (require.main === module) {
  // file is being executed
  start()
} else {
  module.exports = start
}
