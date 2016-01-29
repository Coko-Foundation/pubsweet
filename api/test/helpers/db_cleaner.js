const PouchDB = require('pouchdb')

const dbName = './api/db/' + process.env.NODE_ENV
const db = new PouchDB(dbName).destroy()

module.exports = db
