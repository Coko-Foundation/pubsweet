'use strict'
const PouchDB = require('pouchdb')

const dbName = './api/db/' + process.env.NODE_ENV
let db = new PouchDB(dbName).destroy().then(function (response) {
  console.log('Cleaning database', response)
  return response
}).catch(function (err) {
  console.log(err)
  return err
})

module.exports = db
