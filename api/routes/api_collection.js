const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('./api/db/' + process.env.NODE_ENV)
const _ = require('lodash')
const Collection = require('../models/collection')
const Fragment = require('../models/fragment')
const User = require('../models/user')
const AuthorizationError = require('../errors/authorization_error')
const express = require('express')
const api = express.Router()

const jwt = require('jsonwebtoken')
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const config = require('../../config')

passport.use(new BearerStrategy(
  function (token, done) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (!err) {
        return done(null, decoded.username)
      } else {
        return done(null)
      }
    })
  }
))

// Create collection
api.post('/collection', function (req, res) {
  const collection = new Collection(req.body)

  Collection.get().then(function (existingCollection) {
    if (existingCollection) {
      return res.status(200).json(existingCollection)
    } else {
      return collection.save().then(function (response) {
        console.log(response)
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
api.post('/collection/fragment', passport.authenticate('bearer', { session: false }), function (req, res) {
  var collection
  var fragment = new Fragment(req.body)
  fragment.owner = req.user // He who creates it, owns it
  console.log(req.body)
  console.log(fragment)

  fragment.authorized(req.user, 'create').then(function (res) {
    if (res) {
      console.log(req.user, 'is allowed to create a fragment', res)
      return Collection.get()
    } else {
      console.log(req.user, 'is not allowed to create a fragment', res)
      throw new AuthorizationError(req.user + ' not allowed')
    }
  }).then(function (existingCollection) {
    console.log(existingCollection)
    collection = existingCollection
    return fragment.save()
  })
  .then(function (result) {
    console.log(result)
    fragment = result
    if (collection.fragments) {
      collection.fragments.push(fragment._id)
    } else {
      collection.fragments = [fragment._id]
    }
    return collection.save()
  })
  .then(function (collection) {
    console.log(collection)
    return res.status(201).json(fragment)
  })
  .catch(function (err) {
    console.error('Error:', err)
    if (err.name === 'AuthorizationError') {
      return res.status(401).json(err.message)
    } else {
      return res.status(500)
    }
  })
})

// Get all fragments
api.get('/collection/fragments', function (req, res) {
  Collection.get().then(function (collection) {
    return collection.getFragments()
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
api.put('/collection/fragment/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
  Fragment.findById(req.params.id).then(function (fragment) {
    return fragment.updateProperties(req.body)
  }).then(function (fragment) {
    return fragment.save(req.user)
  }).then(function (fragment) {
    return res.status(200).json(fragment)
  }).catch(function (err) {
    if (err.name === 'AuthorizationError') {
      return res.status(401).json(err.message)
    } else {
      console.error('Error', err)
      return res.sendStatus(500)
    }
  })
})

// Delete a fragment
api.delete('/collection/fragment/:id', function (req, res) {
  db.get(req.params.id).then(function (result) {
    return db.remove(result)
  }).then(function (result) {
    return Collection.get()
  }).then(function (collection) {
    collection.fragments = _.without(collection.fragments, req.params.id)
    return db.put(collection)
  }).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    console.error('Error', err)
    return res.sendStatus(500)
  })
})

module.exports = api
