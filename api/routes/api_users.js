'use strict'
const express = require('express')
const objectAssign = require('object-assign')
// const _ = require('lodash')
const User = require('../models/user')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

const Acl = require('node_acl_pouchdb')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const users = express.Router()
const db = new PouchDB('./api/db/' + process.env.NODE_ENV)
var acl = new Acl(new Acl.pouchdbBackend(db, 'acl'))

passport.use('bearer', new BearerStrategy(
  function (token, done) {
    console.log('Token', token)
    jwt.verify(token, config.secret, function (err, decoded) {
      if (!err) {
        return done(null, decoded.username)
      } else {
        return done(null)
      }
    })
  }
))

// Passport.js configuration (auth)
passport.use('local', new LocalStrategy(function (username, password, done) {
  console.log('User finding', username, password)
  User.findByUsername(username).then(function (user) {
    console.log('User found', user)
    if (!user) {
      return done(null, false, { message: 'Wrong username.' })
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Wrong password.' })
    }
    console.log('User returned', user)
    return done(null, user)
  }).catch(function (err) {
    console.log('Error', err)
    if (err) { return done(err) }
  })
}))

function createToken (user) {
  console.log('Creating token', user)
  return jwt.sign(
    {username: user.username},
    config.secret,
    { expiresIn: 5 * 3600 })
}

// Token issuing
users.post('/authenticate', passport.authenticate('local', { session: false }), function (req, res) {
  return res.status(201).json({ token: createToken(req.user) })
})

// Token verify
users.get('/authenticate', passport.authenticate('bearer', { session: false }), function (req, res) {
  return res.status(200).json({ username: req.user })
})

// Create user
users.post('/', function (req, res) {
  const data = req.body
  const user = new User(data)

  user.save().then(function (response) {
    console.log('User created', response)
    return res.status(201).json(response)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

users.get('/', function (req, res) {
  User.all().then(function (users) {
    console.log(users)
    return res.status(200).json({users: users})
  })
})

// Get user
users.get('/:id', function (req, res) {
  User.findById(req.params.id).then(function (user) {
    console.log('User:', user)
    return res.status(200).json(user)
  }).catch(function (error) {
    console.error('Error:', error)
    return res.status(503)
  })
})

// Destroy a user
users.delete('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
  User.findById(req.params.id).then(function (user) {
    return user.delete(req.user)
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    if (err.name === 'AuthorizationError') {
      return res.status(401).json(err.message)
    } else {
      console.error('Error', err)
      return res.sendStatus(500)
    }
  })
})

// Update a user
users.put('/:id', function (req, res) {
  User.findById(req.params.id).then(function (user) {
    Object.assign(user, req.body)
    console.log(user)
    return db.put(user)
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

module.exports = users
