'use strict'

const config = require('../../config')
const path = require('path')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('relational-pouch'))
PouchDB.plugin(require('pouchdb-upsert'))

global.db = new PouchDB(path.join(config.get('pubsweet-backend.dbPath'), process.env.NODE_ENV))

module.exports = function () {
  if (!db.rel) {
    return db.setSchema([
      {
        singular: 'collection',
        plural: 'collections',
        relations: {
          fragments: {hasMany: 'fragment'},
          owners: {hasMany: 'user'}
        }
      },
      {
        singular: 'fragment',
        plural: 'fragments',
        relations: {
          collection: {belongsTo: 'collection'},
          owners: {hasMany: 'user'}
        }
      },
      {
        singular: 'user',
        plural: 'users',
        relations: {
          collections: {hasMany: 'collection'},
          fragments: {hasMany: 'fragment'},
          teams: {hasMany: 'team'}
        }
      },
      {
        singular: 'team',
        plural: 'teams',
        relations: {
          members: {hasMany: 'user'}
        }
      }
    ])
  }
}
