const PouchDB = require('pouchdb')
PouchDB.debug.enable('*');

const dbName = './db' + process.env.NODE_ENV
const db = new PouchDB(dbName).destroy()

module.exports = db
