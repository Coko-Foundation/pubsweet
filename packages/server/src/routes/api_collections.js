const express = require('express')
const STATUS = require('http-status-codes')
const sse = require('pubsweet-sse')
const passport = require('passport')
const Team = require('../models/Team')
const Collection = require('../models/Collection')

const {
  createFilterFromQuery,
  objectId,
  buildChangeData,
  fieldSelector,
  getTeams,
  applyPermissionFilter,
} = require('./util')

const api = express.Router()

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], {
  session: false,
})

// List collections
api.get('/collections', authBearerAndPublic, async (req, res, next) => {
  try {
    const collections = await Collection.all()
    const filteredCollections = await applyPermissionFilter({
      req,
      target: req.route,
      filterable: collections,
    })

    const collectionsWithSelectedFields = (await Promise.all(
      filteredCollections.map(async collection => {
        const properties = await applyPermissionFilter({
          req,
          target: collection,
        })
        return fieldSelector(req)(properties)
      }),
    )).filter(createFilterFromQuery(req.query))

    res.status(STATUS.OK).json(collectionsWithSelectedFields)
  } catch (err) {
    next(err)
  }
})

// Create a collection
api.post('/collections', authBearer, async (req, res, next) => {
  try {
    const properties = await applyPermissionFilter({
      req,
      target: req.route,
      filterable: req.body,
    })

    const collection = new Collection(properties)
    collection.created = Date.now()

    await collection.save()

    // TODO: filter the output?

    res.status(STATUS.CREATED).json(collection)
    sse.send({ action: 'collection:create', data: { collection } })
  } catch (err) {
    next(err)
  }
})

// Retrieve a collection
api.get(
  '/collections/:collectionId',
  authBearerAndPublic,
  async (req, res, next) => {
    try {
      const collection = await Collection.find(req.params.collectionId)
      const properties = await applyPermissionFilter({
        req,
        target: collection,
      })

      res.status(STATUS.OK).json(properties)
    } catch (err) {
      next(err)
    }
  },
)

// Update a collection
api.patch('/collections/:collectionId', authBearer, async (req, res, next) => {
  try {
    const collection = await Collection.find(req.params.collectionId)
    const properties = await applyPermissionFilter({
      req,
      target: collection,
      filterable: req.body,
    })

    await collection.updateProperties(properties)
    await collection.save()

    const update = buildChangeData(properties, collection)

    res.status(STATUS.OK).json(update)
    sse.send({
      action: 'collection:patch',
      data: { collection: objectId(collection), update },
    })
  } catch (err) {
    next(err)
  }
})

// Delete a collection
api.delete('/collections/:collectionId', authBearer, async (req, res, next) => {
  try {
    const collection = await Collection.find(req.params.collectionId)
    const output = await applyPermissionFilter({ req, target: collection })

    // TODO: filter the output, or return nothing?

    await collection.delete()

    res.status(STATUS.OK).json(output)
    sse.send({
      action: 'collection:delete',
      data: { collection: objectId(collection) },
    })
  } catch (err) {
    next(err)
  }
})

// Retrieve teams for a collection
api.get(
  '/collections/:collectionId/teams',
  authBearerAndPublic,
  async (req, res, next) => {
    const collection = await Collection.find(req.params.collectionId)
    await applyPermissionFilter({ req, target: collection })

    try {
      const teams = (await getTeams({
        req,
        Team,
        id: collection.id,
        type: 'collection',
      })).filter(createFilterFromQuery(req.query))

      res.status(STATUS.OK).json(teams)
    } catch (err) {
      next(err)
    }
  },
)

// Teams
// TODO: Nested teams API to be deprecated
const teams = require('./api_teams')

api.use('/collections/:collectionId/', teams)

module.exports = api
