const db = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-leveldb'))
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-upsert'))
  .plugin(require('relational-pouch'))

if (process.env.NODE_ENV === 'test') {
  db.plugin(require('pouchdb-adapter-memory'))
}

module.exports = db
