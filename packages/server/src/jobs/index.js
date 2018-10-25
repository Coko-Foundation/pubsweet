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

boss.on('error', error => logger.error(error))

let started = false
let connected = false

module.exports = {
  start: async () => {
    if (started) {
      return boss
    }

    await boss.start()
    started = true
    connected = true
    return boss
  },
  connect: async () => {
    if (connected) {
      return boss
    }

    await boss.connect()
    connected = true
    return boss
  },
}
