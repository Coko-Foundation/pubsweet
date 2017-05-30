const path = require('path')
const uuid = require('uuid')

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-upsert'))
  .plugin(require('relational-pouch'))

if (process.env.NODE_ENV === 'test') {
  PouchDB.plugin(require('pouchdb-adapter-memory'))
} else {
  PouchDB.plugin(require('pouchdb-adapter-http')).plugin(require('pouchdb-adapter-leveldb'))
}

const dbPath = require('../config')['pubsweet-server']['dbPath']

const dbAdapter = (dbPath) => {
  // In-memory test db
  if (process.env.NODE_ENV === 'test') return 'memory'

  // HTTP URL, e.g. CouchDB
  if (dbPath.match(/^http:/)) return 'http'

  // local file system
  return 'leveldb'
}

const dbName = (adapter) => {
  switch (adapter) {
    case 'memory':
      // a new database for each test
      return uuid()

    case 'http':
      // use the full URL as configured
      return dbPath

    case 'leveldb':
      // append the node environment to the configured directory path
      return path.join(dbPath, process.env.NODE_ENV)
  }
}

const adapter = dbAdapter(dbPath)

module.exports = () => {
  return new PouchDB(dbName(adapter), { adapter })
}
