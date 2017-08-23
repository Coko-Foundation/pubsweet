const path = require('path')
const uuid = require('uuid')
const config = require('config')
const _ = require('lodash/fp')

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-upsert'))
  .plugin(require('relational-pouch'))

const prepareAdapter = (dbPath) => {
  // Always use in-memory databases for testing
  if (process.env.NODE_ENV === 'test') {
    PouchDB.plugin(require('pouchdb-adapter-memory'))
    return 'memory'
  }

  // HTTP URL, e.g. CouchDB
  if (dbPath.match(/^http:/)) {
    PouchDB.plugin(require('pouchdb-adapter-http'))
    return 'http'
  }

  // local file system
  PouchDB.plugin(require('pouchdb-adapter-leveldb'))
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

const dbPath = _.get('pubsweet-server.dbPath', config)

const adapter = prepareAdapter(dbPath)

module.exports = () => {
  return new PouchDB(dbName(adapter), { adapter })
}
