'use strict'

const STATUS = require('http-status-codes')
const _ = require('lodash')
const User = require('../models/User')
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

// api.use('/:collectionId/fragments/:fragmentId/teams', teams)
api.use('/:id/teams', teams)

// Create a collection
api.post('/', authBearer, (req, res, next) => {
  let collection = new Collection(req.body)
  collection.created = Date.now()
  collection.setOwners([req.user])

  return Authorize.can(
    req.authInfo.id, 'create', collection
  ).then(
    () => collection.save()
  ).then(
    response => res.status(STATUS.CREATED).json(response)
  ).catch(
    next
  )
})

// List collections
api.get('/', (req, res, next) => {
  Collection.all().then(
    collections => res.status(STATUS.OK).json(collections)
  ).catch(
    next
  )
})

// Retrieve a collection
api.get('/:id', (req, res, next) => {
  Collection.find(
    req.params.id
  ).then(
    collection => res.status(STATUS.OK).json(collection)
  ).catch(
    next
  )
})

// Update a collection
api.put('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'update', req.originalUrl
  ).then(
    () => Collection.find(req.params.id)
  ).then(
    collection => collection.updateProperties(req.body)
  ).then(
    collection => collection.save()
  ).then(
    collection => res.status(STATUS.OK).json(collection)
  ).catch(
    next
  )
})

// Delete a collection
api.delete('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'delete', req.originalUrl
  ).then(
    () => Collection.find(req.params.id)
  ).then(
    collection => collection.delete()
  ).then(
    collection => res.status(STATUS.OK).json(collection)
  ).catch(
    next
  )
})

// Create a fragment and update the collection with the fragment
api.post('/:id/fragments', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'create', req.originalUrl).then(
    () => Collection.find(req.params.id)
  ).then(
    collection => {
      let fragment = new Fragment(req.body)
      fragment.setOwners([req.user])
      return Promise.all([collection, fragment.save()])
    }
  ).then(
    ([collection, fragment]) => {
      collection.addFragment(fragment)
      return Promise.all([collection.save(), fragment])
    }
  ).then(
    ([collection, fragment]) => User.ownersWithUsername(fragment)
  ).then(
    fragment => res.status(STATUS.CREATED).json(fragment)
  ).catch(
    next
  )
})

// Get all fragments
api.get('/:id/fragments', authBearerAndPublic, (req, res, next) => {
  const fallback = () => {
    return Collection.find(
      req.params.id
    ).then(
      collection => collection.getFragments({
        filter: fragment => Authorize.can(req.user, 'read', fragment)
      })
    ).then(
      fragments => Promise.all(fragments.map(f => User.ownersWithUsername(f)))
    ).then(
      fragments => res.status(STATUS.OK).json(fragments)
    ).catch(
      next
    )
  }

  return Authorize.can(
    req.user, 'read', req.originalUrl
  ).then(
    () => Collection.find(req.params.id)
  ).then(
    collection => collection.getFragments()
  ).then(
    fragments => Promise.all(fragments.map(f => User.ownersWithUsername(f)))
  ).then(
    fragments => res.status(STATUS.OK).json(fragments)
  ).catch(
    err => (err.name === 'AuthorizationError') ? fallback() : next(err)
  )
})

// Retrieve a fragment
api.get('/:collectionId/fragments/:fragmentId', authBearerAndPublic, (req, res, next) => {
  const fallback = () => Authorize.can(
    undefined, 'read', req.originalUrl
  ).then(
    permission => Fragment.find(req.params.fragmentId)
  ).then(
    fragment => res.status(STATUS.OK).json(fragment)
  ).catch(
    err => res.status(STATUS.NOT_FOUND).json(err.message)
  )

  return Authorize.can(
    req.user, 'read', req.originalUrl
  ).then(
    () => Fragment.find(req.params.fragmentId)
  ).then(
    fragment => res.status(STATUS.OK).json(fragment)
  ).catch(
    err => (err.name === 'AuthorizationError') ? fallback() : next(err)
  )
})

// Update a fragment
api.put('/:collectionId/fragments/:fragmentId', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'update', req.originalUrl
  ).then(
    () => Fragment.find(req.params.fragmentId)
  ).then(
    fragment => fragment.updateProperties(req.body)
  ).then(
    fragment => fragment.save()
  ).then(
    fragment => User.ownersWithUsername(fragment)
  ).then(
    fragment => res.status(STATUS.OK).json(fragment)
  ).catch(
    next
  )
})

// Delete a fragment
api.delete('/:collectionId/fragments/:fragmentId', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'delete', req.originalUrl
  ).then(
    () => Fragment.find(req.params.fragmentId)
  ).then(
    fragment => fragment.delete()
  ).then(
    fragment => Promise.all(
      [Collection.find(req.params.collectionId), fragment]
    )
  ).then(
    ([collection, fragment]) => {
      collection.fragments = _.without(collection.fragments, req.params.fragmentId)
      return Promise.all([collection.save(), fragment])
    }
  ).then(
    ([collection, fragment]) => res.status(STATUS.OK).json(fragment)
  ).catch(
    next
  )
})

module.exports = api
