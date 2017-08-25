'use strict'

const STATUS = require('http-status-codes')
const passport = require('passport')
const express = require('express')
const pickBy = require('lodash/pickBy')

const User = require('../models/User')

const config = require('../../config')
const Authsome = require('authsome')
const authsome = new Authsome(config.authsome, { models: require('../models') })
const { authorizationError } = require('./util')

const Team = require('../models/Team')
const AuthorizationError = require('../errors/AuthorizationError')
const ValidationError = require('../errors/ValidationError')

const authLocal = passport.authenticate('local', { failWithError: true, session: false })
const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()
const authentication = require('../authentication')

// Issue a token
api.post('/authenticate', authLocal, (req, res) => {
  return res.status(
    STATUS.CREATED
  ).json(
    Object.assign({ token: authentication.token.create(req.user) }, req.user)
  )
})

// Verify a token
api.get('/authenticate', authBearer, async (req, res, next) => {
  try {
    const user = await User.find(req.user)
    user.token = req.authIndo.token
    const teams = await Promise.all(
      user.teams.map((teamId) => Team.find(teamId))
    )
    user.teams = teams
    return res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

// Create a user
api.post('/', async (req, res, next) => {
  try {
    let user = new User(req.body)
    if (req.body.admin) throw new ValidationError('invalid property: admin')

    user = await user.save()
    return res.status(STATUS.CREATED).json(user)
  } catch (err) {
    next(err)
  }
})

// List users
api.get('/', authBearer, async (req, res, next) => {
  try {
    const permission = await authsome.can(req.user, req.method, req.path)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.path)
    }

    const users = await User.all()
    return res.status(STATUS.OK).json({users: users})
  } catch (err) {
    next(err)
  }
})

// Get a user
api.get('/:id', authBearer, async (req, res, next) => {
  try {
    const user = await User.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, user)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.path)
    }

    return res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

// Delete a user
api.delete('/:id', authBearer, async (req, res, next) => {
  try {
    let user = await User.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, user)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.path)
    }
    user = await user.delete()
    return res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

// Patch a user
api.patch('/:id', authBearer, async (req, res, next) => {
  try {
    let user = await User.find(req.params.id)
    const permission = await authsome.can(req.user, req.method, user)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.path)
    }

    // TODO: Move this to the authorization mode
    const authenticatedUser = User.find(req.user)
    if (req.body.admin && !authenticatedUser.admin) {
      throw new AuthorizationError('only admins can set other admins')
    }

    if (permission.filter) {
      req.body = pickBy(req.body, permission.filter)
    }

    user = await user.updateProperties(req.body)
    user = await user.save()
    user = await User.find(req.params.id)

    return res.status(STATUS.OK).json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = api
