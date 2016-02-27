'use strict'

const passport = require('passport')
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../models/user')
const Authorize = require('../models/authorize')
const config = require('../../config')
const roles = require('./api_roles')

const authLocal = passport.authenticate('local', { session: false })
const authBearer = passport.authenticate('bearer', { session: false })
const users = express.Router()

// Roles
users.use('/', roles)

function createToken (user) {
  console.log('Creating token', user)
  return jwt.sign(
    { username: user.username },
    config.secret,
    { expiresIn: 5 * 3600 })
}

// Token issuing
users.post('/authenticate', authLocal, function (req, res) {
  return res.status(201).json({ token: createToken(req.user) })
})

// Token verify
users.get('/authenticate', authBearer, function (req, res) {
  return res.status(200).json({ username: req.user })
})

// Create user
users.post('/', function (req, res, next) {
  const user = new User(req.body)

  return user.isUniq().then(function (response) {
    return user.save()
  }).then(function (response) {
    return res.status(201).json(response)
  }).catch(function (err) {
    if (err.name === 'ConflictError') {
      return res.status(409).json(err.message)
    } else {
      next(err)
    }
  })
})

users.get('/', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'read').then(function () {
    return User.all({include: ['roles']})
  }).then(function (users) {
    console.log(users)
    return res.status(200).json({users: users})
  }).catch(function (err) {
    next(err)
  })
})

// Get user
users.get('/:id', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'read').then(function () {
    return User.find(req.params.id, {include: ['roles']})
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    next(err)
  })
})

// Destroy a user
users.delete('/:id', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'delete').then(function (user) {
    return user.delete(req.user)
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    next(err)
  })
})

// Update a user
users.put('/:id', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'update').then(function () {
    return User.find(req.params.id)
  }).then(function (user) {
    Object.assign(user, req.body)
    console.log(user)
    return db.put(user)
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    next(err)
  })
})

module.exports = users
