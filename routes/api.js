const express = require('express')
const objectAssign = require('object-assign')
const _ = require('lodash')
const users = require('./api_users')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const api = express.Router()
const db = new PouchDB('./db' + process.env.NODE_ENV)

function findCollection () {
  // Idempotently create indexes in datastore
  return db.createIndex({
    index: {
      fields: ['type']
    }
  }).then(function (result) {
    return db.find({selector: {type: 'collection'}}).then(function (results) {
      return results.docs[0]
    })
  }).catch(function (err) {
    console.error(err)
  })
}

// Create collection
api.post('/collection', function (req, res) {
  const data = req.body

  const collection = objectAssign({_id: new Date().toISOString()}, data)

  findCollection().then(function (existingCollection) {
    if (existingCollection) {
      return res.status(200).json(existingCollection)
    } else {
      return db.put(collection).then(function (response) {
        return res.status(201).json(response)
      })
    }
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Get collection
api.get('/collection', function (req, res) {
  db.find({
    selector: {type: 'collection'}
  }).then(function (collection) {
    return res.status(200).json(collection.docs[0])
  }).catch(function (error) {
    console.error(error)
    return res.status(503)
  })
})

// Destroy collection
api.delete('/collection', function (req, res) {
  findCollection().then(function (existingCollection) {
    if (existingCollection) {
      return db.remove(existingCollection).then(function (response) {
        return res.status(200).json(response)
      })
    } else {
      return res.status(404)
    }
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Create a fragment and update the collection with the fragment
api.post('/collection/fragment', function (req, res) {
  var collection
  var fragment = objectAssign({_id: new Date().toISOString()}, req.body)
  console.log(req.body)
  console.log(fragment)

  findCollection()
    .then(function (existingCollection) {
      console.log(existingCollection)
      collection = existingCollection
      return db.put(fragment)
    })
    .then(function (result) {
      console.log(result)
      fragment = result
      if (collection.fragments) {
        collection.fragments.push(fragment.id)
      } else {
        collection.fragments = [fragment.id]
      }
      return db.put(collection)
    })
    .then(function (collection) {
      console.log(collection)
      return res.status(201).json(fragment)
    })
    .catch(function (err) {
      console.error(err)
      return res.status(500)
    })
})

// Get all fragments
api.get('/collection/fragments', function (req, res) {
  findCollection().then(function (collection) {
    var fragments = collection.fragments.map(function (id) {
      return db.get(id)
    })
    return Promise.all(fragments)
  }).then(function (fragments) {
    return res.status(200).json(fragments)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

api.get('/collection/fragment/:id', function (req, res) {
  db.get(req.params.id).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Update a fragment
api.put('/collection/fragment', function (req, res) {
  db.get(req.body._id).then(function (result) {
    return db.put(objectAssign({_rev: result._rev}, req.body))
  }).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Delete a fragment
api.delete('/collection/fragment', function (req, res) {
  db.get(req.body._id).then(function (result) {
    return db.remove(result)
  }).then(function (result) {
    return findCollection()
  }).then(function (collection) {
    collection.fragments = _.without(collection.fragments, req.body._id)
    return db.put(collection)
  }).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// File upload API
var multer = require('multer')
var upload = multer({
  dest: 'public/uploads/',
  limits: {fileSize: 1000000, files: 1}
})
api.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file)
  return res.send(req.file.path.replace(/^public/, ''))
})

// Users API
api.use('/users', users)

module.exports = api
