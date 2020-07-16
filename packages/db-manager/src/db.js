const knex = require('knex')
const config = require('config')
const { knexSnakeCaseMappers } = require('objection')
const connection = require('./connectionConfig')

const pool = config['pubsweet-server'] && config['pubsweet-server'].pool
const acquireConnectionTimeout =
  (config['pubsweet-server'] &&
    config['pubsweet-server'].acquireConnectionTimeout) ||
  5000

const db = knex({
  client: 'pg',
  connection,
  pool,
  ...knexSnakeCaseMappers(),
  acquireConnectionTimeout,
  asyncStackTraces: true,
})

module.exports = db
