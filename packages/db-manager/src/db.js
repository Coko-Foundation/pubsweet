const knex = require('knex')
const config = require('config')
const { knexSnakeCaseMappers } = require('objection')

const connection =
  process.env.DATABASE_URL ||
  (config['pubsweet-server'] && config['pubsweet-server'].db)
const pool = config['pubsweet-server'] && config['pubsweet-server'].pool

const db = knex({
  client: 'pg',
  connection,
  pool,
  ...knexSnakeCaseMappers(),
  acquireConnectionTimeout: 5000,
  asyncStackTraces: true,
})

module.exports = db
