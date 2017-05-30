const uuid = require('uuid')
const path = require('path')

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-upsert'))
  .plugin(require('relational-pouch'))

const config = require('../config')

let name, adapter

switch (process.env.NODE_ENV) {
  case 'test':
    PouchDB.plugin(require('pouchdb-adapter-memory'))

    adapter = 'memory'
    name = uuid()

    break

  default:
    PouchDB.plugin(require('pouchdb-adapter-http')).plugin(require('pouchdb-adapter-leveldb'))

    const dbPath = config['pubsweet-server']['dbPath']

    if (dbPath.match(/^http:/)) {
      adapter = 'http'
      name = dbPath
    } else {
      adapter = 'leveldb'
      name = path.join(dbPath, process.env.NODE_ENV)
    }
    break
}

module.exports = () => {
  return new PouchDB(name, { adapter })
}
