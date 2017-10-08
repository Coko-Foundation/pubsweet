'use strict'
const config = require('config')

const STATUS = require('http-status-codes')

const Collection = require('../models/Collection')
const Team = require('../models/Team')

const Authsome = require('authsome')
const authsome = new Authsome(config.authsome, { models: require('../models') })

const express = require('express')
const api = express.Router()

const sse = require('pubsweet-sse')
const { objectId, buildChangeData, fieldSelector, authorizationError, getTeams } = require('./util')

const passport = require('passport')
const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], { session: false })

// List collections
api.get('/collections', authBearerAndPublic, async (req, res, next) => {
  try {
    const permission = await authsome.can(req.user, req.method, req.route)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.route)
    }

    let collections = await Collection.all()

    // Filtering objects, e.g. only show collections that have .published === true
    if (permission.filter) {
      collections = permission.filter(collections)
    }

    collections = await Promise.all(collections.map(async collection => {
      let permission = await authsome.can(req.user, req.method, collection)

      if (permission.filter) {
        // Filtering properties, e.g. only show the title and id properties
        return permission.filter(collection)
      } else {
        return collection
      }
    }))

    collections = collections.map(fieldSelector(req))
    res.status(STATUS.OK).json(collections)
  } catch (err) {
    next(err)
  }
})

// Create a collection
api.post('/collections', authBearer, async (req, res, next) => {
  try {
    const permission = await authsome.can(req.user, req.method, req.route)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.route)
    }

    if (permission.filter) {
      req.body = permission.filter(req.body)
    }

    let collection = new Collection(req.body)

    collection.created = Date.now()
    collection.setOwners([req.user])

    collection = await collection.save()

    res.status(STATUS.CREATED).json(collection)
    sse.send({ action: 'collection:create', data: { collection } })
  } catch (err) {
    next(err)
  }
})

// Retrieve a collection
api.get('/collections/:id', authBearerAndPublic, async (req, res, next) => {
  try {
    let collection = await Collection.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, collection)

    if (!permission) {
      throw authorizationError(req.user, req.method, collection)
    }

    if (permission.filter) {
      collection = permission.filter(collection)
    }
    return res.status(STATUS.OK).json(collection)
  } catch (err) {
    next(err)
  }
})

// Update a collection
api.patch('/collections/:id', authBearer, async (req, res, next) => {
  try {
    let update = req.body
    let collection = await Collection.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, collection)

    if (!permission) {
      throw authorizationError(req.user, req.method, collection)
    }

    if (permission.filter) {
      update = permission.filter(update)
    }

    collection.updateProperties(update)
    collection = await collection.save()

    const updated = buildChangeData(update, collection)

    res.status(STATUS.OK).json(updated)
    sse.send({ action: 'collection:patch', data: { collection: objectId(collection), updated } })
  } catch (err) {
    next(err)
  }
})

// Delete a collection
api.delete('/collections/:id', authBearer, async (req, res, next) => {
  try {
    let collection = await Collection.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, collection)

    if (!permission) {
      throw authorizationError(req.user, req.method, collection)
    }

    collection = await collection.delete()
    res.status(STATUS.OK).json(collection)
    sse.send({ action: 'collection:delete', data: { collection: objectId(collection) } })
  } catch (err) {
    next(err)
  }
})

// Retrieve teams for a collection
api.get('/collections/:collectionId/teams', authBearerAndPublic, async (req, res, next) => {
  try {
    let teams = await getTeams({
      req: req,
      Team: Team,
      authsome: authsome,
      id: req.params.collectionId,
      type: 'collection' })
    console.log(teams)
    res.status(STATUS.OK).json(teams)
  } catch (err) {
    next(err)
  }
})

// Teams
// TODO: Nested teams API to be deprecated
const teams = require('./api_teams')
api.use('/collections/:collectionId/', teams)

module.exports = api
