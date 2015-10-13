const express = require('express')
const objectAssign = require('object-assign')
const api = express.Router()

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('*')
const db = new PouchDB('./db' + process.env.NODE_ENV)

// Idempotently create indexes in datastore
db.createIndex({
  index: {
    fields: ['type']
  }
}).then(function (result) {
  // yo, a result
}).catch(function (err) {
  // ouch, an error
})

// POST (create collection)
api.post('/collection', function(req, res) {
  const data = req.body

  const collection = objectAssign({_id: new Date().toISOString()}, data)

  db.put(collection).then(function (response) {
    console.log(response)
    return res.status(201).json(response)
  }).catch (function (err) {
    console.error(err)
    return res.status(500)
  })
})

// GET (index)
api.get('/collection', function(req, res) {
  db.find({
    selector: {type: 'collection'}
  }).then(function (collection) {
    return res.status(200).json(collection.docs[0])
  }).catch(function (error) {
    console.error(err)
    return res.status(503)
  })
})

// GET (show)
api.get('/:id', function(req, res) {
  const id = req.params.id

  db.findOne({_id: id}, function (err, found) {
    if (err) {
      console.error(err)
      return res.status(503)
    }

    return res.status(200).json(found)
  })
})

// PUT (update)
api.put('/:id', function(req, res) {
  const id = req.params.id
  const data = req.body

  db.update({_id: id}, data, function (err, found) {
    if (err) {
      console.error(err)
      return res.status(503)
    }

    return res.status(200).json(found)
  })
})

// DELETE (...)
api.delete('/:id', function(req, res) {
  const id = req.params.id
  db.remove({_id: id}, {}, function (err, numRemoved) {
    if (err) {
      console.error(err)
      return res.status(503)
    }

    return res.status(200).json(numRemoved)
  })
})

module.exports = api
