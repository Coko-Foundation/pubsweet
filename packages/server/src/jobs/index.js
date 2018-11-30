// const config = require('config')
const PgBoss = require('pg-boss')
const logger = require('@pubsweet/logger')

const db = require('../db')

const dbAdapter = {
  executeSql: (sql, parameters = []) => {
    try {
      // This is needed to replace pg-boss' $1, $2 arguments
      // into knex's :val, :val2 style.
      const replacedSql = sql.replace(/\$(\d+)\b/g, (_, number) => `:${number}`)

      const parametersObject = {}
      parameters.forEach(
        (value, index) => (parametersObject[`${index + 1}`] = value),
      )

      return db.raw(replacedSql, parametersObject)
    } catch (err) {
      return logger.error('Error querying database:', err.message)
    }
  },
}

const boss = new PgBoss({ db: dbAdapter })

boss.on('error', async error => {
  logger.error(error)

  // We've had processes remain open in testing,
  // because job queues kept polling the database,
  // while the database no longer existed.
  if (
    process.env.NODE_ENV === 'test' &&
    error.message.match(/database.*does not exist/)
  ) {
    if (started) {
      started = false
      await boss.stop()
    }
    if (connected) {
      connected = false
      await boss.disconnect()
    }
  }
})

// 'Start' is for queue maintainers (i.e. pubsweet-server)
let started = false
// 'Connect' is for queue observers (e.g. a job worker)
let connected = false

module.exports = {
  startJobQueue: async () => {
    if (started) {
      return boss
    }

    await boss.start()
    started = true
    connected = true
    return boss
  },
  stopJobQueue: async () => {
    await boss.stop()
    started = false
    connected = false
  },
  connectToJobQueue: async () => {
    if (connected) {
      return boss
    }

    await boss.connect()
    connected = true
    return boss
  },
}
