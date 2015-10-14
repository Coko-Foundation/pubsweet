const express = require('express')
const objectAssign = require('object-assign')
const api = express.Router()

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('*')

const db = new PouchDB('./db' + process.env.NODE_ENV)

function findCollection() {
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
api.post('/collection', function(req, res) {
  const data = req.body

  const collection = objectAssign({_id: new Date().toISOString()}, data)

  findCollection().then(function (existingCollection) {
    if(existingCollection) {
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

// Destroy collection
api.delete('/collection', function(req, res) {
  findCollection().then(function (existingCollection) {
    if(existingCollection) {
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
api.post('/collection/fragment', function(req, res) {
  var collection
  var fragment = objectAssign({_id: new Date().toISOString()}, req.body)
  var dbFragment = db.put(fragment)

  var dbCollection = findCollection()
    .then(function (existingCollection) {
      collection = existingCollection
      return dbFragment
    })
    .then(function (result) {
      fragment = result
      if(collection.fragments) {
        collection.fragments.push(fragment.id)
      } else {
        collection.fragments = [fragment.id]
      }
      return db.put(collection)
    })
    .then(function (collection) {
      return res.status(201).json(fragment)
    })
    .catch(function(err) {
      return res.status(500)
      return console.error(err)
    })
})

// Get all fragments
api.get('/collection/fragments', function(req, res) {
  findCollection().then(function (collection) {
    var fragments = collection.fragments.map(function (id) {
      return db.get(id)
    })
    return Promise.all(fragments)
  }).then(function (fragments) {
    return res.status(200).json(fragments)
  }).catch(function (err) {
    console.error(err)
    return res.status(503)
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
