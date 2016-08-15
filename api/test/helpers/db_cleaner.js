'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const dbName = './api/db/' + process.env.NODE_ENV
const logger = require('../../logger')

let dbCleaner = function () {
  return global.db.destroy().then(function (response) {
    global.db = new PouchDB(dbName)
    return db.allDocs()
  }).then(function (response) {
    logger.info('Cleaning database', response)
    return response
  }).catch(function (err) {
    logger.error('Error cleaning database', err)
    return err
  })
}

module.exports = dbCleaner
