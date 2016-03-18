const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const _ = require('lodash')
const Collection = require('../models/collection')
const Fragment = require('../models/Fragment')
const Authorize = require('../models/authorize')
const express = require('express')
const api = express.Router()
const passport = require('passport')

// Temporary extension mechanism
const substance = require('../registry/substance')

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], { session: false })

// Create collection
api.post('/collection', authBearer, function (req, res) {
  const collection = new Collection(req.body)
  collection.owner(req.user)

  Collection.get().then(function (existingCollection) {
    if (existingCollection) {
      res.status(200).json(existingCollection)
    } else {
      return collection.save(req.user)
    }
  }).then(function (response) {
    console.log(response.body)
    return res.status(201).json(response)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Get collection
api.get('/collection', function (req, res) {
  Collection.get().then(function (collection) {
    return res.status(200).json(collection)
  }).catch(function (error) {
    console.error(error)
    return res.status(503)
  })
})

// Destroy collection
api.delete('/collection', function (req, res) {
  Collection.get().then(function (existingCollection) {
    if (existingCollection) {
      return existingCollection.delete().then(function (response) {
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
api.post('/collection/fragments', authBearer, function (req, res, next) {
  var collection
  var fragment = new Fragment(req.body)
  fragment.owner = req.user // He who creates it, owns it

  return Authorize.it(req.user, req.originalUrl, 'create').then(function () {
    return Collection.get()
  }).then(function (existingCollection) {
    collection = existingCollection
    return fragment.save()
  })
  .then(function (result) {
    fragment = result
    collection.addFragment(fragment)
    return collection.save()
  })
  .then(function (collection) {
    return res.status(201).json(fragment)
  }).catch(function (err) {
    next(err)
  })
})

// Get all fragments

api.get('/collection/fragments', authBearerAndPublic, function (req, res, next) {
  var fallback = Collection.get().then(function (collection) {
    console.log('Falling back to anonymous')
    return collection.getFragments({filter: 'published'})
  }).catch(function (err) {
    next(err)
  })

  return Authorize.it(req.user, req.originalUrl, 'read').then(function (authorization) {
    return Collection.get()
  }).then(function (collection) {
    return collection.getFragments()
  }).then(function (fragments) {
    return res.status(200).json(fragments)
  }).catch(function (err) {
    if (err.name === 'AuthorizationError') {
      console.error(err)
      return fallback.then(function (fragments) {
        res.status(200).json(fragments)
      })
    } else {
      next(err)
    }
  })
})

api.get('/collection/fragments/:id', authBearerAndPublic, function (req, res, next) {
  var fallback = Fragment.find(req.params.id).then(function (fragment) {
    if (fragment.published) {
      return fragment
    } else {
      throw new Error('Not Found')
    }
  })

  return Authorize.it(req.user, req.originalUrl, 'read').then(function (authorization) {
    return Fragment.find(req.params.id)
  }).then(function (fragment) {
    return res.status(200).json(fragment)
  }).catch(function (err) {
    if (err.name === 'AuthorizationError') {
      fallback.then(function (fragment) {
        return res.status(200).json(fragment)
      }).catch(function (err) {
        return res.status(404).json(err.message)
      })
    } else {
      next(err)
    }
  })
})

// Update a fragment
api.put('/collection/fragments/:id', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'update').then(function (authorization) {
    return Fragment.find(req.params.id)
  }).then(function (fragment) {
    return fragment.updateProperties(req.body)
  }).then(function (fragment) {
    return fragment.save()
  }).then(function (fragment) {
    return res.status(200).json(fragment)
  }).catch(function (err) {
    next(err)
  })
})

// Delete a fragment
api.delete('/collection/fragments/:id', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'delete').then(function (authorization) {
    return Fragment.find(req.params.id)
  }).then(function (fragment) {
    return fragment.delete()
  }).then(function () {
    return Collection.get()
  }).then(function (collection) {
    collection.fragments = _.without(collection.fragments, req.params.id)
    return collection.save()
  }).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    next(err)
  })
})

// TEMP EXTENSION API
api.use('/substance', substance)

module.exports = api
