const express = require('express')
const path = require('path')
const startServer = require(path.resolve('node_modules', 'pubsweet-server')) // use app's local pubsweet-server

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
