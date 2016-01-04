import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('../db/db' + process.env.NODE_ENV)

class Base {
  constructor (properties) {

  }

  save () {
    db.put(this).then(function (response) {
      console.log(response)
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

export default Base
