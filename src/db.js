const path = require('path')
const uuid = require('uuid')
const config = require('config')
const _ = require('lodash/fp')

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-upsert'))
  .plugin(require('relational-pouch'))

const getAdapterIdentifier = (dbPath) => {
  if (config.has('pubsweet-server.adapter')) {
    return config.get('pubsweet-server.adapter')
  }

  if (process.env.NODE_ENV === 'test') {
    return 'memory'
  }

  if (dbPath.match(/^http/)) {
    return 'http'
  }

  return 'leveldb'
}

const preparePouchConfig = (adapter) => {
  switch (adapter) {
    case 'memory':
      PouchDB.plugin(require('pouchdb-adapter-memory'))
      // a new database for each test
      return { name: uuid(), adapter }

    case 'http':
      PouchDB.plugin(require('pouchdb-adapter-http'))
      return { name: dbPath, adapter }

    case 'leveldb':
      PouchDB.plugin(require('pouchdb-adapter-leveldb'))
      return { name: path.join(dbPath, process.env.NODE_ENV), adapter }
  }
}

const dbPath = _.get('pubsweet-server.dbPath', config)
const adapterIdentifier = getAdapterIdentifier(dbPath)
const pouchConfig = preparePouchConfig(adapterIdentifier)

module.exports = () => {
  // Pass name as first arg because passing { name } on options
  // seems to produce different result (see Pouch issue #1137 ?) 
  return new PouchDB(pouchConfig.name, { adapter: pouchConfig.adapter })
}
