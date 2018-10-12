const STATUS = require('http-status-codes')
const passport = require('passport')
const express = require('express')

const models = require('../models')

const { User } = models

const authsome = require('../helpers/authsome')

const ValidationError = require('../errors/ValidationError')

const authLocal = passport.authenticate('local', {
  failWithError: true,
  session: false,
})
const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()
const authentication = require('../authentication')

const {
  applyPermissionFilter,
  fieldSelector,
  createFilterFromQuery,
  authorizationError,
} = require('./util')

// Issue a token
api.post('/users/authenticate', authLocal, async (req, res) => {
  const user = Object.assign(
    { token: authentication.token.create(req.user) },
    req.user,
  )
  req.user = req.user.id
  const properties = await applyPermissionFilter({
    req,
    target: user,
  })

  return res.status(STATUS.CREATED).json(properties)
})

// Verify a token
api.get('/users/authenticate', authBearer, async (req, res, next) => {
  try {
    const user = await User.find(req.user)
    user.token = req.authInfo.token
    res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

// Create a user
api.post('/users', async (req, res, next) => {
  try {
    let user = new User(req.body)
    if (req.body.admin) throw new ValidationError('invalid property: admin')

    user = await user.save()
    res.status(STATUS.CREATED).json(user)
  } catch (err) {
    next(err)
  }
})

// List users
api.get('/users', authBearer, async (req, res, next) => {
  try {
    const users = await User.all()
    const filteredUsers = await applyPermissionFilter({
      req,
      target: req.route,
      filterable: users,
    })

    const usersWithSelectedFields = (await Promise.all(
      filteredUsers.map(async user => {
        const properties = await applyPermissionFilter({
          req,
          target: user,
        })
        return fieldSelector(req)(properties)
      }),
    )).filter(createFilterFromQuery(req.query))

    res.status(STATUS.OK).json({ users: usersWithSelectedFields })
  } catch (err) {
    next(err)
  }
})

// Get a user
api.get('/users/:id', authBearer, async (req, res, next) => {
  try {
    const user = await User.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, user)

    const properties = await applyPermissionFilter({
      req,
      target: user,
    })

    if (!permission) {
      throw authorizationError(req.user, req.method, req.path)
    }

    res.status(STATUS.OK).json(properties)
  } catch (err) {
    next(err)
  }
})

// Delete a user
api.delete('/users/:id', authBearer, async (req, res, next) => {
  try {
    let user = await User.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, user)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.path)
    }
    user = await user.delete()
    res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

// Patch a user
api.patch('/users/:id', authBearer, async (req, res, next) => {
  try {
    let user = await User.find(req.params.id)

    const currentAndUpdate = { current: user, update: req.body }
    const properties = await applyPermissionFilter({
      req,
      target: currentAndUpdate,
      filterable: req.body,
    })

    user = await user.updateProperties(properties)
    user = await user.save()
    user = await User.find(req.params.id)

    res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = api
