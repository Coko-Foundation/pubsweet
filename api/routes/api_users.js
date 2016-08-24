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
    { expiresIn: 24 * 3600 }
  )
}

// Token issuing
users.post('/authenticate', authLocal, (req, res) => {
  return User.find(
    req.authInfo.id
  ).then(
    user => {
      return res.status(201).json(Object.assign(
        { token: createToken(req.user) },
        user
      ))
    }
  ).catch(
    err => {
      if (err.name === 'NotFoundError') {
        return res.status(401).json(Object.assign(
          { error: 'User not found' },
          req.authInfo
        ))
      }
    }
  )
})

// Token verify
users.get('/authenticate', authBearer, (req, res) => {
  return User.find(req.authInfo.id).then(user => {
    user.token = req.authInfo.token
    return res.status(200).json(user)
  })
})

// Create user
users.post('/', (req, res, next) => {
  logger.info(req.body)
  const user = new User(req.body)

  // TODO: Move this to a validation step
  if (req.body.admin && !user.admin) {
    throw new AuthorizationError('only admins can set other admins')
  }

  return user.isUniq().then(response => {
    return user.save()
  }).then(response => {
    return res.status(201).json(response)
  }).catch(err => {
    next(err)
  })
})

users.get('/', authBearer, (req, res, next) => {
  return Authorize.can(req.authInfo.id, 'read', req.originalUrl).then(() => {
    return User.all()
  }).then(users => {
    logger.info(users)
    return res.status(200).json({users: users})
  }).catch(err => {
    next(err)
  })
})

// Get user
users.get('/:id', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'read', req.originalUrl).then(() => {
    return User.find(req.params.id)
  }).then(user => {
    return res.status(200).json(user)
  }).catch(err => {
    next(err)
  })
})

// Destroy a user
users.delete('/:id', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'delete', req.originalUrl).then(user => {
    return user.delete()
  }).then(user => {
    return res.status(200).json(user)
  }).catch(err => {
    next(err)
  })
})

// Update a user
users.put('/:id', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'update', req.originalUrl).then(() => {
    return User.find(req.user)
  }).then(user => {
    // TODO: Move this to a validation step
    if (req.body.admin && !user.admin) {
      throw new AuthorizationError('only admins can set other admins')
    }
    return User.find(req.params.id)
  }).then(user => {
    return user.updateProperties(req.body)
  }).then(user => {
    return user.save()
  }).then(user => {
    return User.find(req.params.id)
  }).then(user => {
    return res.status(200).json(user)
  }).catch(err => {
    next(err)
  })
})

module.exports = users
