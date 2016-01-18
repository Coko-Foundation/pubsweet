
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('./db/' + process.env.NODE_ENV)

class Base {
  constructor (properties) {

  }

  save () {
    return db.put(this).then(function (response) {
      return response
    })
  }

  delete () {
    db.get(this.id).then(function (result) {
      db.remove(result)
      console.log('Deleted: ', result)
    })
  }

  static findById (id) {
    // Idempotently create indexes in datastore
    return db.get(id).then(function (result) {
      return new Base(result)
    }).catch(function (err) {
      console.error(err)
    })
  }
}

module.exports = {
  db: db,
  Base: Base
}
