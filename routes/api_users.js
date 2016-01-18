'use strict'
const express = require('express')
const objectAssign = require('object-assign')
// const _ = require('lodash')
const User = require('../models/user')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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

// Create user
users.post('/', function (req, res) {
  const data = req.body
  const user = new User(objectAssign({_id: new Date().toISOString()}, data))

  user.save().then(function (response) {
    return res.status(201).json(response)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Get user
users.get('/:id', function (req, res) {
  User.findById(req.params.id).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (error) {
    console.error(error)
    return res.status(503)
  })
})

// Destroy a user
users.delete('/:id', function (req, res) {
  User.findById(req.params.id).delete().then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Update a user
users.put('/:id', function (req, res) {
  let user = User.findById(req.params.id)
  user = objectAssign(user, req.body)

  return db.put(user).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

module.exports = users
