'use strict'
const config = require('config')

const STATUS = require('http-status-codes')

const User = require('../models/User')
const Collection = require('../models/Collection')
const Team = require('../models/Team')
const Fragment = require('../models/Fragment')

const Authsome = require('authsome')
const authsome = new Authsome(config.authsome, { models: require('../models') })
const NotFoundError = require('../errors/NotFoundError')
const express = require('express')
const api = express.Router()
const passport = require('passport')
const sse = require('pubsweet-sse')
const { objectId, buildChangeData, fieldSelector, authorizationError, getTeams } = require('./util')

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

// Create a fragment and update the collection with the fragment
api.post('/collections/:collectionId/fragments', authBearer, async (req, res, next) => {
  try {
    let collection = await Collection.find(req.params.collectionId)
    const permission = await authsome.can(req.user, req.method, {
      path: req.route.path,
      collection: collection,
      fragment: req.body
    })

    if (!permission) {
      throw authorizationError(req.user, req.method, collection)
    }

    if (permission.filter) {
      req.body = permission.filter(req.body)
    }

    let fragment = new Fragment(req.body)

    fragment.setOwners([req.user])
    fragment = await fragment.save()

    collection.addFragment(fragment)
    collection = await collection.save()

    // How to address this?
    fragment = await User.ownersWithUsername(fragment)

    res.status(STATUS.CREATED).json(fragment)
    sse.send({ action: 'fragment:create', data: { collection: objectId(collection), fragment } })
  } catch (err) {
    next(err)
  }
})

// Get all fragments
api.get('/collections/:id/fragments', authBearerAndPublic, async (req, res, next) => {
  try {
    let collection = await Collection.find(req.params.id)
    let fragments = await collection.getFragments()

    // Filter fragments
    fragments = await Promise.all(fragments.map(fragment => {
      return authsome.can(req.user, req.method, fragment).then(permission => {
        // Filter fragments' properties
        if (permission.filter) {
          return permission.filter(fragment)
        } else if (permission) {
          return fragment
        }
      })
    }))

    fragments = fragments.filter(fragment => fragment !== undefined)

    // Decorate owners with usernames
    fragments = await Promise.all(fragments.map(f => User.ownersWithUsername(f)))
    fragments = fragments.map(fieldSelector(req))

    return res.status(STATUS.OK).json(fragments)
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
    res.status(STATUS.OK).json(teams)
  } catch (err) {
    next(err)
  }
})

// Retrieve a fragment
api.get('/collections/:collectionId/fragments/:fragmentId', authBearerAndPublic, async (req, res, next) => {
  try {
    let fragment = await Fragment.find(req.params.fragmentId)
    let permission = await authsome.can(req.user, req.method, fragment)

    if (!permission) {
      throw authorizationError(req.user, req.method, fragment)
    }

    return Fragment.find(req.params.fragmentId).then(fragment => {
      if (permission.filter) {
        fragment = permission.filter(fragment)
      }
      return res.status(STATUS.OK).json(fragment)
    })
  } catch (err) {
    res.status(STATUS.NOT_FOUND).json(err.message)
  }
})

// Update a fragment
api.patch('/collections/:collectionId/fragments/:fragmentId', authBearer, async (req, res, next) => {
  try {
    const collection = await Collection.find(req.params.collectionId)

    if (!collection.fragments.includes(req.params.fragmentId)) {
      throw new NotFoundError(`collection ${collection.id} does not contain fragment ${req.params.fragmentId}`)
    }

    let fragment = await Fragment.find(req.params.fragmentId)
    const permission = await authsome.can(req.user, req.method, fragment)

    if (!permission) {
      throw authorizationError(req.user, req.method, fragment)
    }

    if (permission.filter) {
      req.body = permission.filter(req.body)
    }

    fragment.updateProperties(req.body)

    fragment = await fragment.save()
    fragment = await User.ownersWithUsername(fragment)

    const update = buildChangeData(req.body, fragment)

    res.status(STATUS.OK).json(update)
    sse.send({ action: 'fragment:patch', data: { fragment: objectId(fragment), update } })
  } catch (err) {
    next(err)
  }
})

// Delete a fragment
api.delete('/collections/:collectionId/fragments/:fragmentId', authBearer, async (req, res, next) => {
  try {
    let collection = await Collection.find(req.params.collectionId)

    if (!collection.fragments.includes(req.params.fragmentId)) {
      throw new NotFoundError(`collection ${collection.id} does not contain fragment ${req.params.fragmentId}`)
    }

    let fragment = await Fragment.find(req.params.fragmentId)
    const permission = await authsome.can(req.user, req.method, fragment)

    if (!permission) {
      throw authorizationError(req.user, req.method, fragment)
    }

    fragment = await fragment.delete()
    collection.removeFragment(fragment)
    collection = await collection.save()

    res.status(STATUS.OK).json(fragment)
    sse.send({ action: 'fragment:delete', data: { collection: objectId(collection), fragment } })
  } catch (err) {
    next(err)
  }
})

// Retrieve teams for a fragment
api.get('/collections/:collectionId/fragments/:fragmentId/teams', authBearerAndPublic, async (req, res, next) => {
  try {
    let teams = await getTeams({
      req: req,
      Team: Team,
      authsome: authsome,
      id: req.params.fragmentId,
      type: 'fragment' })

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
