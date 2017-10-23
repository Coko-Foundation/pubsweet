const express = require('express')

// global 'pubsweet start' needs to use an app's local pubsweet-server.
const oldNodePath = process.env.NODE_PATH
process.env.NODE_PATH = process.cwd()
const startServer = require('pubsweet-server')
process.env.NODE_PATH = oldNodePath

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
