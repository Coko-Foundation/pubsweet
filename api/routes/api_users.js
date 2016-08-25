'use strict'

const passport = require('passport')
const jwt = require('jsonwebtoken')
const express = require('express')

const User = require('../models/User')
const Authorize = require('../models/Authorize')
const AuthorizationError = require('../errors/AuthorizationError')
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
    { expiresIn: 24 * 3600 })
}

// Token issuing
users.post('/authenticate', authLocal, function (req, res) {
  return User.find(req.authInfo.id).then(function (user) {
    return res.status(201).json(Object.assign(
      { token: createToken(req.user) },
      user
    ))
  })
})

// Token verify
users.get('/authenticate', authBearer, function (req, res, next) {
  return User.find(req.authInfo.id).then(function (user) {
    user.token = req.authInfo.token
    return res.status(200).json(user)
  }).catch(next)
})

// Create user
users.post('/', function (req, res, next) {
  logger.info(req.body)
  const user = new User(req.body)

  // TODO: Move this to a validation step
  if (req.body.admin && !user.admin) {
    throw new AuthorizationError('only admins can set other admins')
  }

  return user.isUniq().then(function (response) {
    return user.save()
  }).then(function (response) {
    return res.status(201).json(response)
  }).catch(function (err) {
    next(err)
  })
})

users.get('/', authBearer, function (req, res, next) {
  return Authorize.can(req.authInfo.id, 'read', req.originalUrl).then(function () {
    return User.all()
  }).then(function (users) {
    logger.info(users)
    return res.status(200).json({users: users})
  }).catch(function (err) {
    next(err)
  })
})

// Get user
users.get('/:id', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'read', req.originalUrl).then(function () {
    return User.find(req.params.id)
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    next(err)
  })
})

// Destroy a user
users.delete('/:id', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'delete', req.originalUrl).then(function (user) {
    return user.delete()
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    next(err)
  })
})

// Update a user
users.put('/:id', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'update', req.originalUrl).then(function () {
    return User.find(req.user)
  }).then(function (user) {
    // TODO: Move this to a validation step
    if (req.body.admin && !user.admin) {
      throw new AuthorizationError('only admins can set other admins')
    }
    return User.find(req.params.id)
  }).then(function (user) {
    return user.updateProperties(req.body)
  }).then(function (user) {
    return user.save()
  }).then(function (user) {
    return User.find(req.params.id)
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    next(err)
  })
})

module.exports = users
