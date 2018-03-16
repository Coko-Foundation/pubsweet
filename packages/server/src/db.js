const pg = require('pg')
const config = require('config')
const logger = require('@pubsweet/logger')

const ignoreError =
  config.has('pubsweet-server.ignoreTerminatedConnectionError') &&
  config.get('pubsweet-server.ignoreTerminatedConnectionError')
const connectionDetails =
  config['pubsweet-server'] && config['pubsweet-server'].db

const pool = new pg.Pool(connectionDetails)
pool.on('error', err => {
  // ignore some errors which are thrown in integration tests
  if (
    ignoreError &&
    err.message !== 'terminating connection due to administrator command'
  ) {
    logger.error(err)
  }
})

module.exports = pool
