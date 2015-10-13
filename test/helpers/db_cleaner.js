const PouchDB = require('pouchdb')
PouchDB.debug.enable('*');

function resolveRemovals(removals, resolve, reject) {
  Promise.all(removals).then(function (results) {
    resolve(results)
    console.log('Deleted all documents from (' + dbName + ')')
  }).catch(function (err) {
    console.error(err)
    reject(err)
  })
}

var dbCleaner = new Promise(function (resolve, reject) {
  const dbName = './db' + process.env.NODE_ENV
  const db = new PouchDB(dbName)

  db.allDocs({}).then(function (results) {
    removals = results.rows.map(function (result) {
      return db.remove(result)
    })
    resolveRemovals(removals, resolve, reject)
  }).catch(function (err) {
    reject(err)
  })
})


module.exports = dbCleaner
