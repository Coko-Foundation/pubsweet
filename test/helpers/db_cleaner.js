const PouchDB = require('pouchdb')

const dbName = './db/' + process.env.NODE_ENV
const db = new PouchDB(dbName).destroy()

module.exports = db
