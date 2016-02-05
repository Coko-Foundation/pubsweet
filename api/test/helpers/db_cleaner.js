const PouchDB = require('pouchdb')

const dbName = './api/db/' + process.env.NODE_ENV
const db = new PouchDB(dbName).destroy().then(function (response) {
  console.log('Cleaning database')
}).catch(function (err) {
  console.log(err)
})

module.exports = db
