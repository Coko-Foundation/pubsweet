'use strict'
const config = require('../../config')

const STATUS = require('http-status-codes')
const without = require('lodash/without')
const pickBy = require('lodash/pickBy')

const User = require('../models/User')
const Collection = require('../models/Collection')
const Fragment = require('../models/Fragment')

const Authsome = require('authsome')
let authsome = new Authsome(config.authsome, { models: require('../models') })
const AuthorizationError = require('../errors/AuthorizationError')

const express = require('express')
const api = express.Router()
const passport = require('passport')
const sse = require('pubsweet-sse')
const { objectId, buildChangeData, fieldSelector } = require('./util')

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], { session: false })

// Teams
const teams = require('./api_teams')

var authorizationError = function (username, operation, object) {
  username = username || 'public'
  const msg = `User ${username} is not allowed to ${operation} ${object}`
  throw new AuthorizationError(msg)
}
// TEMP
const Authorize = ''

api.use('/:id/teams', teams)

// List collections
api.get('/collections', authBearerAndPublic, (req, res, next) => {
  // use authsome directly
  return authsome.can(req.user, req.method, req.path).then(permission => {
    if (!permission) {
      return authorizationError(req.user, req.method, req.path)
    }

    let collections = Collection.all()

    // Filtering by object, e.g. only show collections that have .published === true
    if (permission.filter) {
      collections = collections.filter(permission.filter)
    }

    return collections
  }).then(collections => {
    return collections.map(collection => {
      return authsome.can(req.user, req.method, collection).then(permission => {
        // Filtering by properties, e.g. only show the title and id properties
        if (permission.filter) {
          collection = pickBy(collection, permission.filter)
        }

        return collection
      })
    })
  }).then(
    collections => collections.map(fieldSelector(req))
  ).then(
    collections => res.status(STATUS.OK).json(collections)
  ).catch(
    next
  )
})

// Create a collection
api.post('/collections', authBearer, (req, res, next) => {
  return authsome.can(req.user, req.method, req.path).then(permission => {
    if (!permission) {
      return authorizationError(req.user, req.method, req.path)
    }

    let collection = new Collection(req.body)

    if (permission.filter) {
      collection = pickBy(collection, permission.filter)
    }

    collection.created = Date.now()
    collection.setOwners([req.user])

    return collection.save()
  }).then(
    collection => {
      res.status(STATUS.CREATED).json(collection)
      sse.send({ action: 'collection:create', data: { collection } })
    }
  ).catch(
    next
  )
})

// Retrieve a collection
api.get('/collections/:id', authBearerAndPublic, async (req, res, next) => {
  let collection = await Collection.find(req.params.id)
  let permission = await authsome.can(req.user, req.method, collection)

  try {
    if (!permission) {
      authorizationError(req.user, req.method, collection)
    }

    if (permission.filter) {
      collection = pickBy(collection, permission.filter)
    }
    return res.status(STATUS.OK).json(collection)
  } catch (err) {
    next(err)
  }
})

// Update a collection
api.patch('/collections/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'update', req.originalUrl
  ).then(
    () => Collection.find(req.params.id)
  ).then(
    collection => collection.updateProperties(req.body)
  ).then(
    collection => collection.save()
  ).then(
    collection => {
      const update = buildChangeData(req.body, collection)

      res.status(STATUS.OK).json(update)
      sse.send({ action: 'collection:patch', data: { collection: objectId(collection), update } })
    }
  ).catch(
    next
  )
})

// Delete a collection
api.delete('/collections/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'delete', req.originalUrl
  ).then(
    () => Collection.find(req.params.id)
  ).then(
    collection => collection.delete()
  ).then(
    collection => {
      res.status(STATUS.OK).json(collection)
      sse.send({ action: 'collection:delete', data: { collection: objectId(collection) } })
    }
  ).catch(
    next
  )
})

// Create a fragment and update the collection with the fragment
api.post('/collections/:id/fragments', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'create', req.originalUrl).then(
    () => Collection.find(req.params.id)
  ).then(collection => {
    const fragment = new Fragment(req.body)
    fragment.collection = collection
    fragment.setOwners([req.user])

    return fragment.save().then(fragment => {
      collection.addFragment(fragment)

      return collection.save().then(collection => {
        return User.ownersWithUsername(fragment).then(fragment => {
          res.status(STATUS.CREATED).json(fragment)
          sse.send({ action: 'fragment:create', data: { collection: objectId(collection), fragment } })
        })
      })
    })
  }).catch(
    next
  )
})

// Get all fragments
api.get('/collections/:id/fragments', authBearerAndPublic, async (req, res, next) => {
  let collection = await Collection.find(req.params.id)

  if (!collection) {
    return res.status(STATUS.NOT_FOUND)
  }

  let fragments = await collection.getFragments()

  // Filter by object
  fragments = await Promise.all(fragments.map(fragment => {
    return authsome.can(req.user, req.method, fragment).then(permission => {
      if (permission.filter) {
        return pickBy(fragment, permission.filter)
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
})

// Retrieve a fragment
api.get('/collections/:collectionId/fragments/:fragmentId', authBearerAndPublic, async (req, res, next) => {
  let fragment = await Fragment.find(req.params.fragmentId)
  let permission = await authsome.can(req.user, req.method, fragment)

  try {
    if (!permission) {
      return authorizationError(req.user, req.method, fragment)
    }

    return Fragment.find(req.params.fragmentId).then(fragment => {
      if (permission.filter) {
        fragment = pickBy(fragment, permission.filter)
      }
      return res.status(STATUS.OK).json(fragment)
    })
  } catch (err) {
    res.status(STATUS.NOT_FOUND).json(err.message)
  }
})

// Update a fragment
api.patch('/collections/:collectionId/fragments/:fragmentId', authBearer, (req, res, next) => {
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
    fragment => {
      const update = buildChangeData(req.body, fragment)

      res.status(STATUS.OK).json(update)
      sse.send({ action: 'fragment:patch', data: { fragment: objectId(fragment), update } })
    }
  ).catch(
    next
  )
})

// Delete a fragment
api.delete('/collections/:collectionId/fragments/:fragmentId', authBearer, (req, res, next) => {
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
      let fragments = without(collection.fragments, req.params.fragmentId)
      collection.fragments = fragments.map(id => new Fragment({id: id}))
      return Promise.all([collection.save(), fragment])
    }
  ).then(
    ([collection, fragment]) => {
      res.status(STATUS.OK).json(fragment)
      sse.send({ action: 'fragment:delete', data: { collection: objectId(collection), fragment } })
    }
  ).catch(
    next
  )
})

module.exports = api
