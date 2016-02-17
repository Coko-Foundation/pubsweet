var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

var dbName = './testdb'

var db1 = new PouchDB(dbName)

var db = db1.put({_id: '1', type: 'hi', test: '1'}).then(function () {
  return new PouchDB(dbName).destroy()
}).then(function (response) {
  console.log('Cleaning database', response)
  return response
}).then(function (response) {
  db1 = new PouchDB(dbName)
  return db1.put({_id: '2', type: 'hi', test: '2'})
}).then(function (response) {
  var db2 = new PouchDB(dbName)
  return db2.put({_id: '3', type: 'hi', test: '3'})
}).then(function (docs) {
  console.log(docs)
}).then(function () {
  return db1.createIndex({
    index: {
      fields: ['type']
    }
  })
}).then(function (result) {
  console.log(result)
  return db1.find({selector: {
    type: 'hi'
  }})
}).then(function (results) {
  return results.docs.map(function (result) {
    console.log(result)
    return result
  })
}).catch(function (err) {
  console.log(err)
  return err
})

