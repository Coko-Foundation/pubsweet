'use strict'

const config = require('../../../config')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const dbName = config.dbPath + process.env.NODE_ENV
const logger = require('../../logger')

let dbCleaner = () => {
  return global.db.destroy().then(
    (response) => {
      global.db = new PouchDB(dbName)
      return db.allDocs()
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
