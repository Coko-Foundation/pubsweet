const uuid = require('uuid')

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-upsert'))
  .plugin(require('relational-pouch'))

const config = require('../config')

if (process.env.NODE_ENV === 'test') {
  PouchDB.plugin(require('pouchdb-adapter-memory'))

  module.exports = name => {
    return new PouchDB(uuid(), { adapter: 'memory' })
  }
} else {
  PouchDB
    .plugin(require('pouchdb-adapter-http'))
    .plugin(require('pouchdb-adapter-leveldb'))

  module.exports = name => {
    const dbPath = config['pubsweet-server']['dbPath']

    return new PouchDB(dbPath, {
      adapter: dbPath.match(/^http:/) ? 'http' : 'leveldb'
    })
  }
}
