'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const logger = require('../../src/logger')

let dbCleaner = () => {
  let dbName = global.db._db_name

  return global.db.destroy().then(
    (response) => {
      global.db = new PouchDB(dbName)
      return global.db.allDocs()
    }
  ).then(
    (response) => {
      logger.info('Cleaning database', response)
      return response
    }
  ).catch(
    (err) => {
      logger.error('Error cleaning database', err)
      return err
    }
  )
}

module.exports = dbCleaner
