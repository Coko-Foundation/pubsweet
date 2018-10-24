// const config = require('config')
const PgBoss = require('pg-boss')
const logger = require('@pubsweet/logger')

const db = require('../db')

const alphabet = stringNumber => {
  const number = Number(stringNumber)
  if (number > 25) {
    throw new Error('Number too big to be converted to alphabet')
  }
  return 'abcdefghijklmnopqrstuvwxyz'.split('')[Number(stringNumber)]
}

const dbAdapter = {
  executeSql: (sql, parameters = []) => {
    try {
      // This is needed to replace pg-boss' $1, $2 arguments
      // into knex's :val, :val2 style.
      const replacedSql = sql.replace(
        /\$(\d+)\b/g,
        (_, number) => `:${alphabet(number)}`,
      )

      const parametersObject = {}
      parameters.forEach(
        (value, index) => (parametersObject[`${alphabet(index + 1)}`] = value),
      )

      return db.raw(replacedSql, parametersObject)
    } catch (err) {
      return logger.error('Error querying database', err.message)
    }
  },
}

const boss = new PgBoss({ db: dbAdapter })

boss.on('error', error => logger.error(error))

let started = false

module.exports = async () => {
  if (started) {
    return boss
  }

  await boss.start()
  started = true
  return boss
}
