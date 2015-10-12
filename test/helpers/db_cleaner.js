const PouchDB = require('pouchdb')
PouchDB.debug.enable('*');

var dbCleaner = new Promise(function (resolve, reject) {
  const dbName = './db' + process.env.NODE_ENV
  const db = new PouchDB(dbName)

  db.allDocs({}).then(function (results) {
    results = results.rows.map(function (result) {
      return db.remove(result)
    })
    resolve(results)
    console.log('Cleaned test database (' + dbName + ')')
  }).catch(function (err) {
    console.log(err)
    reject(err)
  })
})


module.exports = dbCleaner
