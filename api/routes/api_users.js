'use strict'

const STATUS = require('http-status-codes')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const express = require('express')

const User = require('../models/User')
const Authorize = require('../models/Authorize')
const AuthorizationError = require('../errors/AuthorizationError')
const ValidationError = require('../errors/ValidationError')
const config = require('../../config')

const authLocal = passport.authenticate('local', { failWithError: true, session: false })
const authBearer = passport.authenticate('bearer', { session: false })
const users = express.Router()
const logger = require('../logger')

function createToken (user) {
  logger.info('Creating token for', user.username)
  return jwt.sign(
    {
      username: user.username,
      id: user.id
    },
    config.secret,
    { expiresIn: 24 * 3600 }
  )
}

// Token issuing
users.post('/authenticate', authLocal, (req, res) => {
  return User.find(
    req.authInfo.id
  ).then(
    user => res.status(
      STATUS.CREATED
    ).json(
      Object.assign({ token: createToken(req.user) }, user)
    )
  ).catch(
    err => {
      if (err.name === 'NotFoundError') {
        return res.status(STATUS.UNAUTHORIZED).json(Object.assign(
          { error: 'User not found' },
          req.authInfo
        ))
      }
    }
  )
})

// Token verify
users.get('/authenticate', authBearer, (req, res, next) => {
  return User.find(
    req.authInfo.id
  ).then(
    user => {
      user.token = req.authInfo.token
      return res.status(STATUS.OK).json(user)
    }
  ).catch(next)
})

// Create user
users.post('/', (req, res, next) => {
  const user = new User(req.body)

  if (req.body.admin) throw new ValidationError('invalid propery: admin')

  return user.isUniq().then(
    response => user.save()
  ).then(
    response => res.status(STATUS.CREATED).json(response)
  ).catch(
    next
  )
})

users.get('/', authBearer, (req, res, next) => {
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
users.get('/:id', authBearer, (req, res, next) => {
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
users.delete('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'delete', req.originalUrl
  ).then(
    () => User.find(req.params.id)
  ).then(
    user => user.delete()
  ).then(
    user => res.status(STATUS.OK).json(user)
  ).catch(
    next
  )
})

// Update a user
users.put('/:id', authBearer, (req, res, next) => {
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

module.exports = users
