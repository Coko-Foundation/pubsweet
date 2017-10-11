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
const AuthorizationError = require('../errors/AuthorizationError')
const express = require('express')
const api = express.Router()
const passport = require('passport')
const sse = require('pubsweet-sse')
const { objectId, buildChangeData, fieldSelector, authorizationError, getTeams } = require('./util')

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], { session: false })

/**
 * Load a Collection from the database, using `:collectionId` from the route.
 *
 * @param req object Request
 *
 * @throws NotFoundError if the entity doesn't exist.
 *
 * @return {Promise<Collection>}
 */
const getCollection = req => {
  return Collection.find(req.params.collectionId)
}

/**
 * Load a fragment from the database, using `:fragmentId` from the route.
 *
 * @param req object Request
 *
 * @throws NotFoundError if the Collection doesn't exist, the collection doesn't contain the given Fragment, or the fragment doesn't exist.
 *
 * @returns {Promise<Fragment>}
 */
const getFragment = async req => {
  const collection = await getCollection(req)

  if (!collection.fragments.includes(req.params.fragmentId)) {
    throw new NotFoundError(`collection ${collection.id} does not contain fragment ${req.params.fragmentId}`)
  }

  return Fragment.find(req.params.fragmentId)
}

/**
 * Check that the current user can perform this action (HTTP verb) on the given object or route.
 *
 * If required, the output is filtered.
 *
 * @param req        object     Request
 * @param target     mixed      The subject of the permissions check
 * @param filterable mixed|null An optional thing to be filtered instead of the target
 *
 * @throws AuthorizationError if permission is not granted.
 *
 * @returns {Promise} The (filtered) target, if permission is granted
 */
const applyPermission = async (req, target, filterable) => {
  const permission = await authsome.can(req.user, req.method, target)

  if (!permission) {
    throw authorizationError(req.user, req.method, target)
  }

  return filter(filterable || target, permission)
}

/**
 * If a filter is specified, applies that filter to the object and returns the result.
 * If a filter is not specified, the original object is returned.
 *
 * @returns mixed
 */
const filter = (object, permission) => {
  return permission.filter ? permission.filter(object) : object
}

// List collections
api.get('/collections', authBearerAndPublic, async (req, res, next) => {
  try {
    let collections = await Collection.all()

    // Filtering objects, e.g. only show collections that have .published === true
    collections = await applyPermission(req, req.route, collections)

    // Filtering properties, e.g. only show the title and id properties
    collections = await Promise.all(collections.map(
      collection => applyPermission(req, collection)
    ))

    collections = collections.map(fieldSelector(req))

    res.status(STATUS.OK).json(collections)
  } catch (err) {
    next(err)
  }
})

// Create a collection
api.post('/collections', authBearer, async (req, res, next) => {
  try {
    const properties = await applyPermission(req, req.route, req.body)

    const collection = new Collection(properties)
    collection.created = Date.now()
    collection.setOwners([req.user])

    await collection.save()

    // TODO: filter the output?

    res.status(STATUS.CREATED).json(collection)
    sse.send({ action: 'collection:create', data: { collection } })
  } catch (err) {
    next(err)
  }
})

// Retrieve a collection
api.get('/collections/:collectionId', authBearerAndPublic, async (req, res, next) => {
  try {
    const collection = await getCollection(req)
    const properties = await applyPermission(req, collection)

    return res.status(STATUS.OK).json(properties)
  } catch (err) {
    next(err)
  }
})

// Update a collection
api.patch('/collections/:collectionId', authBearer, async (req, res, next) => {
  try {
    const collection = await getCollection(req)
    const properties = await applyPermission(req, collection, req.body)

    await collection.updateProperties(properties)
    await collection.save()

    const updated = buildChangeData(properties, collection)

    res.status(STATUS.OK).json(updated)
    sse.send({ action: 'collection:patch', data: { collection: objectId(collection), updated } })
  } catch (err) {
    next(err)
  }
})

// Delete a collection
api.delete('/collections/:collectionId', authBearer, async (req, res, next) => {
  try {
    const collection = await getCollection(req)
    const output = await applyPermission(req, collection)

    // TODO: filter the output, or return nothing?

    await collection.delete()

    res.status(STATUS.OK).json(output)
    sse.send({ action: 'collection:delete', data: { collection: objectId(collection) } })
  } catch (err) {
    next(err)
  }
})

// Create a fragment and update the collection with the fragment
api.post('/collections/:collectionId/fragments', authBearer, async (req, res, next) => {
  try {
    const collection = await getCollection(req)

    let properties

    try {
      const object = {
        path: req.route.path,
        collection,
        fragment: req.body
      }

      properties = await applyPermission(req, object, req.body)
    } catch (e) {
      if (e instanceof AuthorizationError) {
        throw authorizationError(req.user, req.method, collection)
      }
      throw e
    }

    const fragment = new Fragment(properties)

    fragment.setOwners([req.user])
    await fragment.save()

    collection.addFragment(fragment)
    await collection.save()

    fragment.owners = await User.ownersWithUsername(fragment)

    res.status(STATUS.CREATED).json(fragment)
    sse.send({ action: 'fragment:create', data: { collection: objectId(collection), fragment } })
  } catch (err) {
    next(err)
  }
})

// Get all fragments
api.get('/collections/:collectionId/fragments', authBearerAndPublic, async (req, res, next) => {
  try {
    const collection = await getCollection(req)

    let fragments = await collection.getFragments()

    // Filter fragments and their properties
    fragments = await Promise.all(fragments.map(async fragment => {
      try {
        return await applyPermission(req, fragment)
      } catch (e) {
        if (e instanceof AuthorizationError) {
          return undefined
        }

        throw e
      }
    }))

    fragments = fragments.filter(fragment => fragment !== undefined)

    // Decorate owners with usernames
    await Promise.all(fragments.map(async fragment => {
      fragment.owners = await User.ownersWithUsername(fragment)
    }))

    fragments = fragments.map(fieldSelector(req))

    return res.status(STATUS.OK).json(fragments)
  } catch (err) {
    next(err)
  }
})

// Retrieve teams for a collection
api.get('/collections/:collectionId/teams', authBearerAndPublic, async (req, res, next) => {
  const collection = await getCollection(req)
  await applyPermission(req, collection)

  try {
    const teams = await getTeams({
      req,
      Team,
      authsome,
      id: collection.id,
      type: 'collection'
    })

    res.status(STATUS.OK).json(teams)
  } catch (err) {
    next(err)
  }
})

// Retrieve a fragment
api.get('/collections/:collectionId/fragments/:fragmentId', authBearerAndPublic, async (req, res, next) => {
  try {
    const fragment = await getFragment(req)
    const properties = await applyPermission(req, fragment)

    return res.status(STATUS.OK).json(properties)
  } catch (err) {
    res.status(STATUS.NOT_FOUND).json(err.message)
  }
})

// Update a fragment
api.patch('/collections/:collectionId/fragments/:fragmentId', authBearer, async (req, res, next) => {
  try {
    const fragment = await getFragment(req)
    const properties = await applyPermission(req, fragment, req.body)

    await fragment.updateProperties(properties)
    await fragment.save()
    fragment.owners = await User.ownersWithUsername(fragment)

    const update = buildChangeData(properties, fragment)

    res.status(STATUS.OK).json(update)
    sse.send({ action: 'fragment:patch', data: { fragment: objectId(fragment), update } })
  } catch (err) {
    next(err)
  }
})

// Delete a fragment
api.delete('/collections/:collectionId/fragments/:fragmentId', authBearer, async (req, res, next) => {
  try {
    const collection = await getCollection(req)
    const fragment = await getFragment(req)
    await applyPermission(req, fragment)

    await fragment.delete()
    collection.removeFragment(fragment)
    await collection.save()

    res.status(STATUS.OK).json(fragment)
    sse.send({ action: 'fragment:delete', data: { collection: objectId(collection), fragment } })
  } catch (err) {
    next(err)
  }
})

// Retrieve teams for a fragment
api.get('/collections/:collectionId/fragments/:fragmentId/teams', authBearerAndPublic, async (req, res, next) => {
  try {
    const fragment = await getFragment(req)
    await applyPermission(req, fragment)

    const teams = await getTeams({
      req,
      Team,
      authsome,
      id: fragment.id,
      type: 'fragment'
    })

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
