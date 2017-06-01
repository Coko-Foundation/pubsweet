'use strict'

const STATUS = require('http-status-codes')
const passport = require('passport')
const express = require('express')

const User = require('../models/User')
const Authorize = require('../models/Authorize')
const Team = require('../models/Team')
const AuthorizationError = require('../errors/AuthorizationError')
const ValidationError = require('../errors/ValidationError')

const authLocal = passport.authenticate('local', { failWithError: true, session: false })
const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()
const authentication = require('../authentication')

// Token issuing
api.post('/authenticate', authLocal, (req, res) => {
  return res.status(
    STATUS.CREATED
  ).json(
    Object.assign({ token: authentication.token.create(req.user) }, req.user)
  )
})

// Token verify
api.get('/authenticate', authBearer, (req, res, next) => {
  return User.find(
    req.authInfo.id
  ).then(
    user => {
      user.token = req.authInfo.token
      let teams = user.teams.map((teamId) => Team.find(teamId))
      return Promise.all([user, Promise.all(teams)])
    }
  ).then(
    ([user, teams]) => {
      user.teams = teams
      return res.status(STATUS.OK).json(user)
    }
  ).catch(next)
})

// Create user
api.post('/', (req, res, next) => {
  const user = new User(req.body)

  if (req.body.admin) throw new ValidationError('invalid property: admin')

  return user.save().then(
    response => res.status(STATUS.CREATED).json(response)
  ).catch(
    next
  )
})

// List users
api.get('/', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'read', req.originalUrl
  ).then(
    () => User.all()
  ).then(
    users => res.status(STATUS.OK).json({ users: users })
  ).catch(
    next
  )
})

// Get user
api.get('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'read', req.originalUrl
  ).then(
    () => User.find(req.params.id)
  ).then(
    user => res.status(STATUS.OK).json(user)
  ).catch(
    next
  )
})

// Destroy a user
api.delete('/:id', authBearer, async (req, res, next) => {
  try {
    await Authorize.can(req.user, 'delete', req.originalUrl)
    const user = await User.find(req.params.id)
    const deletedUser = await user.delete()

    res.status(STATUS.OK).json(deletedUser)
  } catch (e) {
    next(e)
  }
})

// Update a user
api.put('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'update', req.originalUrl
  ).then(
    () => User.find(req.user)
  ).then(
    user => {
      // TODO: Move this to a validation step
      if (req.body.admin && !user.admin) {
        throw new AuthorizationError('only admins can set other admins')
      }
      return User.find(req.params.id)
    }
  ).then(
    user => user.updateProperties(req.body)
  ).then(
    user => user.save()
  ).then(
    user => User.find(req.params.id)
  ).then(
    user => res.status(STATUS.OK).json(user)
  ).catch(
    next
  )
})

module.exports = api
