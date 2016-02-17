'use strict'
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const AclPouchDb = require('node_acl_pouchdb')

const dbName = './api/db/' + process.env.NODE_ENV

let dbCleaner = function () {
  return new PouchDB(dbName).destroy().then(function (response) {
    global.db = new PouchDB(dbName)
    global.acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))
    return db.info()
  }).then(function (response) {
    console.log('Cleaning database', response)
    return response
  }).catch(function (err) {
    console.log('Error cleaning database', err)
    return err
  })
}
module.exports = dbCleaner
