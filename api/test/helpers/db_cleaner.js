'use strict'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const dbName = './api/db/' + process.env.NODE_ENV

let dbCleaner = function () {
  return global.db.destroy().then(function (response) {
    global.db = new PouchDB(dbName)
    return db.allDocs()
  }).then(function (response) {
    console.log('Cleaning database', response)
    return response
  }).catch(function (err) {
    console.log('Error cleaning database', err)
    return err
  })
}

module.exports = dbCleaner
