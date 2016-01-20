'use strict'
const express = require('express')
const objectAssign = require('object-assign')
// const _ = require('lodash')
const User = require('../models/user')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Acl = require('node_acl_pouchdb')

// Passport.js configuration (auth)
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function (email, password, done) {
    User.findByEmail({ email: email }).then(function (user) {
      if (!user) {
        return done(null, false, { message: 'Wrong email.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Wrong password.' })
      }
      return done(null, user)
    }).catch(function (err) {
      if (err) { return done(err) }
    })
  }
))

const users = express.Router()
const db = new PouchDB('./db/' + process.env.NODE_ENV)
var acl = new Acl(new Acl.pouchdbBackend(db, 'acl'))

// Create user
users.post('/', function (req, res) {
  const data = req.body
  const user = new User(objectAssign({_id: new Date().toISOString()}, data))

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
    return res.status(200).json(users)
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
users.delete('/:id', function (req, res) {
  User.findById(req.params.id).then(function (user) {
    return user.delete()
  }).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
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
