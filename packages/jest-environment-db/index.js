const NodeEnvironment = require('jest-environment-node')
const pg = require('pg')

require('../server/test/helpers/jest-setup')

const config = require('config')

const dbConfig = config['pubsweet-server'] && config['pubsweet-server'].db
Object.assign(dbConfig, {
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 1000,
})

let client

class DatabaseTestEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()
    client = await new pg.Client(dbConfig)
    client.connect()

    // pass the test database name into the test environment as a global
    this.global.__testDbName = `test_${Math.floor(Math.random() * 9999999)}`
    await client.query(`CREATE DATABASE ${this.global.__testDbName}`)
  }

  async teardown() {
    // terminate other connections from test before dropping db
    await client.query(
      `REVOKE CONNECT ON DATABASE ${this.global.__testDbName} FROM public`,
    )
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${this.global.__testDbName}'`)
    await client.query(`DROP DATABASE ${this.global.__testDbName}`)
    await client.end()
    await super.teardown()
  }
}

module.exports = DatabaseTestEnvironment
