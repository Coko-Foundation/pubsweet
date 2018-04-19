const User = require('../models/User')
const Collection = require('../models/Collection')
const Team = require('../models/Team')
const Fragment = require('../models/Fragment')

const authsome = require('../helpers/authsome')
const AuthorizationError = require('../errors/AuthorizationError')
const STATUS = require('http-status-codes')

const express = require('express')

const api = express.Router()
const passport = require('passport')
const SSE = require('pubsweet-sse')

const sse = new SSE()
const {
  objectId,
  createFilterFromQuery,
  buildChangeData,
  fieldSelector,
  authorizationError,
  getTeams,
  applyPermissionFilter,
  getFragment,
} = require('./util')

const authBearer = passport.authenticate('bearer', { session: false })
const authBearerAndPublic = passport.authenticate(['bearer', 'anonymous'], {
  session: false,
})

// Create a fragment and update the collection with the fragment
api.post(
  '/collections/:collectionId/fragments',
  authBearer,
  async (req, res, next) => {
    try {
      const collection = await Collection.find(req.params.collectionId)

      const object = {
        path: req.route.path,
        collection,
        fragment: req.body,
      }

      const filteredProperties = await applyPermissionFilter({
        req,
        target: object,
        filterable: req.body,
      })

      const fragment = new Fragment(filteredProperties)

      fragment.setOwners([req.user])
      await fragment.save()

      collection.addFragment(fragment)
      await collection.save()

      fragment.owners = await User.ownersWithUsername(fragment)

      res.status(STATUS.CREATED).json(fragment)
      sse.send({
        action: 'fragment:create',
        data: { collection: objectId(collection), fragment },
      })
    } catch (err) {
      next(err)
    }
  },
)

// Get all fragments
api.get(
  '/collections/:collectionId/fragments',
  authBearerAndPublic,
  async (req, res, next) => {
    try {
      const collection = await Collection.find(req.params.collectionId)
      let fragments = await collection.getFragments()

      // Filter fragments and their properties
      fragments = await Promise.all(
        fragments.map(async fragment => {
          try {
            return await applyPermissionFilter({ req, target: fragment })
          } catch (e) {
            if (e instanceof AuthorizationError) {
              return undefined
            }

            throw e
          }
        }),
      )

      fragments = fragments
        .filter(fragment => fragment !== undefined)
        .filter(createFilterFromQuery(req.query))

      // Decorate owners with usernames
      await Promise.all(
        fragments.map(async fragment => {
          fragment.owners = await User.ownersWithUsername(fragment)
        }),
      )

      fragments = fragments.map(fieldSelector(req))

      res.status(STATUS.OK).json(fragments)
    } catch (err) {
      next(err)
    }
  },
)

// Retrieve a fragment
api.get(
  '/collections/:collectionId/fragments/:fragmentId',
  authBearerAndPublic,
  async (req, res, next) => {
    try {
      const fragment = await getFragment({ req, Collection, Fragment })
      fragment.owners = await User.ownersWithUsername(fragment)
      const properties = await applyPermissionFilter({ req, target: fragment })

      res.status(STATUS.OK).json(properties)
    } catch (err) {
      res.status(STATUS.NOT_FOUND).json(err.message)
    }
  },
)

// Update a fragment
api.patch(
  '/collections/:collectionId/fragments/:fragmentId',
  authBearer,
  async (req, res, next) => {
    try {
      const fragment = await getFragment({ req, Collection, Fragment })
      const properties = await applyPermissionFilter({
        req,
        target: fragment,
        filterable: req.body,
      })

      await fragment.updateProperties(properties)
      await fragment.save()
      fragment.owners = await User.ownersWithUsername(fragment)

      const update = buildChangeData(properties, fragment)

      res.status(STATUS.OK).json(update)
      sse.send({
        action: 'fragment:patch',
        data: { fragment: objectId(fragment), update },
      })
    } catch (err) {
      next(err)
    }
  },
)

// Delete a fragment
api.delete(
  '/collections/:collectionId/fragments/:fragmentId',
  authBearer,
  async (req, res, next) => {
    try {
      const collection = await Collection.find(req.params.collectionId)
      const fragment = await getFragment({ req, Collection, Fragment })
      await applyPermissionFilter({ req, target: fragment })

      await fragment.delete()
      collection.removeFragment(fragment)
      await collection.save()

      res.status(STATUS.OK).json(fragment)
      sse.send({
        action: 'fragment:delete',
        data: { collection: objectId(collection), fragment },
      })
    } catch (err) {
      next(err)
    }
  },
)

// Retrieve teams for a fragment
api.get(
  '/collections/:collectionId/fragments/:fragmentId/teams',
  authBearerAndPublic,
  async (req, res, next) => {
    try {
      const fragment = await getFragment({ req, Collection, Fragment })
      await applyPermissionFilter({ req, target: fragment })

      const teams = (await getTeams({
        req,
        Team,
        id: fragment.id,
        type: 'fragment',
      })).filter(createFilterFromQuery(req.query))

      res.status(STATUS.OK).json(teams)
    } catch (err) {
      next(err)
    }
  },
)

// Get all fragments
api.get('/fragments', authBearerAndPublic, async (req, res, next) => {
  try {
    const fragments = (await Fragment.all()).filter(
      createFilterFromQuery(req.query),
    )

    // Filter fragments and their properties
    const propertyFilter = fieldSelector(req)
    const filteredFragments = await Promise.all(
      fragments.map(async fragment => {
        try {
          return await applyPermissionFilter({
            req,
            target: propertyFilter(fragment),
          })
        } catch (e) {
          if (e instanceof AuthorizationError) {
            return undefined
          }

          throw e
        }
      }),
    )

    res.status(STATUS.OK).json(filteredFragments)
  } catch (err) {
    next(err)
  }
})

api.post('/fragments', authBearer, async (req, res, next) => {
  try {
    const permission = await authsome.can(req.user, req.method, {
      path: req.route.path,
      fragment: req.body,
    })

    if (!permission) {
      throw authorizationError(req.user, req.method, req.body)
    }

    if (permission.filter) {
      req.body = permission.filter(req.body)
    }

    let fragment = new Fragment(req.body)

    fragment.setOwners([req.user])
    fragment = await fragment.save()

    // How to address this?
    fragment.owners = await User.ownersWithUsername(fragment)

    res.status(STATUS.CREATED).json(fragment)
    sse.send({ action: 'fragment:create', data: { fragment } })
  } catch (err) {
    next(err)
  }
})

// Retrieve a fragment
api.get(
  '/fragments/:fragmentId',
  authBearerAndPublic,
  async (req, res, next) => {
    try {
      let fragment = await Fragment.find(req.params.fragmentId)
      const permission = await authsome.can(req.user, req.method, fragment)

      if (!permission) {
        throw authorizationError(req.user, req.method, fragment)
      }

      if (permission.filter) {
        fragment = permission.filter(fragment)
      }
      res.status(STATUS.OK).json(fragment)
    } catch (err) {
      next(err)
    }
  },
)

// Update a fragment
api.patch('/fragments/:fragmentId', authBearer, async (req, res, next) => {
  try {
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
    fragment.owners = await User.ownersWithUsername(fragment)

    const update = buildChangeData(req.body, fragment)
    res.status(STATUS.OK).json(update)

    sse.send({
      action: 'fragment:patch',
      data: { fragment: objectId(fragment), update },
    })
  } catch (err) {
    next(err)
  }
})

// Delete a fragment
api.delete('/fragments/:fragmentId', authBearer, async (req, res, next) => {
  try {
    let fragment = await Fragment.find(req.params.fragmentId)
    const permission = await authsome.can(req.user, req.method, fragment)

    if (!permission) {
      throw authorizationError(req.user, req.method, fragment)
    }

    fragment = await fragment.delete()

    res.status(STATUS.OK).json(fragment)
    sse.send({ action: 'fragment:delete', data: { fragment } })
  } catch (err) {
    next(err)
  }
})

// Retrieve teams for a fragment
api.get(
  '/fragments/:fragmentId/teams',
  authBearerAndPublic,
  async (req, res, next) => {
    try {
      const teams = (await getTeams({
        req,
        Team,
        id: req.params.fragmentId,
        type: 'fragment',
      })).filter(createFilterFromQuery(req.query))

      res.status(STATUS.OK).json(teams)
    } catch (err) {
      next(err)
    }
  },
)

module.exports = api
