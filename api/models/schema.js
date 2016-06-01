'use strict'

var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('relational-pouch'))
PouchDB.plugin(require('pouchdb-upsert'))
const AclPouchDb = require('node_acl_pouchdb')

global.db = new PouchDB('./api/db/' + process.env.NODE_ENV)
global.acl = new AclPouchDb(new AclPouchDb.pouchdbBackend(db, 'acl'))

module.exports = function () {
  if (!db.rel) {
    return db.setSchema([
      {
        singular: 'collection',
        plural: 'collections',
        relations: {
          fragments: {hasMany: 'fragment'},
          owner: {belongsTo: 'user'}
        }
      },
      {
        singular: 'fragment',
        plural: 'fragments',
        relations: {
          collection: {belongsTo: 'collection'},
          owner: {belongsTo: 'user'}
        }
      },
      {
        singular: 'user',
        plural: 'users',
        relations: {
          collections: {hasMany: 'collection'},
          fragments: {hasMany: 'fragment'}
        }
      }
    ])
  }
}

