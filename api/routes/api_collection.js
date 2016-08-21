'use strict'

const _ = require('lodash')
const Collection = require('../models/Collection')
const Fragment = require('../models/Fragment')
const Authorize = require('../models/Authorize')
const express = require('express')
const api = express.Router()
const passport = require('passport')

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], { session: false })

// Teams
const teams = require('./api_teams')

api.use('/collections/:id/fragments/teams', teams)
api.use('/collections/:id/teams', teams)

// Create collection
api.post('/collections', authBearer, function (req, res, next) {
  return Authorize.can(req.authInfo.id, 'create', req.originalUrl).then(function () {
    let collection = new Collection(req.body)
    collection.owner(req.user)
    return collection.save()
  }).then(function (response) {
    return res.status(201).json(response)
  }).catch(function (err) {
    next(err)
  })
})

// List collections
api.get('/collections', function (req, res, next) {
  Collection.all().then(function (collections) {
    return res.status(200).json(collections)
  }).catch(function (err) {
    next(err)
  })
})

api.get('/collections/:id', function (req, res, next) {
  Collection.find(req.params.id).then(function (collection) {
    return res.status(200).json(collection)
  }).catch(function (err) {
    next(err)
  })
})

api.delete('/collections/:id', function (req, res, next) {
  return Authorize.can(req.user, 'read', req.originalUrl).then(function () {
    return Collection.find(req.params.id)
  }).then(function (collection) {
    return collection.delete()
  }).then(function (collection) {
    return res.status(200).json(collection)
  }).catch(function (err) {
    next(err)
  })
})

// Create a fragment and update the collection with the fragment
api.post('/collections/:id/fragments', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'create', req.originalUrl).then(function () {
    return Collection.find(req.params.id)
  }).then(function (collection) {
    let fragment = new Fragment(req.body)
    fragment.owners = [req.user]
    return [collection, fragment.save()]
  }).then(function ([collection, fragment]) {
    collection.addFragment(fragment)
    return [collection.save(), fragment]
  }).then(function ([collection, fragment]) {
    return res.status(201).json(fragment)
  }).catch(function (err) {
    next(err)
  })
})

// Get all fragments
api.get('/collections/:id/fragments', authBearerAndPublic, function (req, res, next) {
  var fallback = function () {
    return Collection.find(req.params.id).then(function (collection) {
      return collection.getFragments({filter: function (fragment) {
        return Authorize.can(req.user, 'read', fragment)
      }})
    }).catch(function (err) {
      next(err)
    })
  }

  return Authorize.can(req.user, 'read', req.originalUrl).then(function () {
    return Collection.find(req.params.id)
  }).then(function (collection) {
    return collection.getFragments()
  }).then(function (fragments) {
    return res.status(200).json(fragments)
  }).catch(function (err) {
    if (err.name === 'AuthorizationError') {
      return fallback().then(function (fragments) {
        res.status(200).json(fragments)
      })
    } else {
      next(err)
    }
  })
})

api.get('/collections/:collectionId/fragments/:fragmentId', authBearerAndPublic, function (req, res, next) {
  var fallback = Fragment.find(req.params.fragmentId).then(function (fragment) {
    if (fragment.published) {
      return fragment
    } else {
      throw new Error('Not Found')
    }
  })

  return Authorize.can(req.user, 'read', req.originalUrl).then(function () {
    return Fragment.find(req.params.fragmentId)
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
api.put('/collections/:collectionId/fragments/:fragmentId', authBearer, function (req, res, next) {
  return Authorize.can(req.user, req.originalUrl, 'update').then(function () {
    return Fragment.find(req.params.fragmentId)
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
api.delete('/collections/:collectionId/fragments/:fragmentId', authBearer, function (req, res, next) {
  return Authorize.can(req.user, req.originalUrl, 'delete').then(function () {
    return Fragment.find(req.params.fragmentId)
  }).then(function (fragment) {
    return fragment.delete()
  }).then(function (fragment) {
    return [Collection.find(req.params.collectionId), fragment]
  }).then(function ([collection, fragment]) {
    collection.fragments = _.without(collection.fragments, req.params.fragmentId)
    return [collection.save(), fragment]
  }).then(function ([collection, fragment]) {
    return res.status(200).json(fragment)
  }).catch(function (err) {
    next(err)
  })
})

module.exports = api
