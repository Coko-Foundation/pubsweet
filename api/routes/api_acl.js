'use strict'
const express = require('express')
const objectAssign = require('object-assign')
// const _ = require('lodash')
const User = require('../models/user')

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

const api = express.Router()

// Create a role
api.post('/roles', function (req, res) {

})

// Assign a user to a role
api.post('/ace', function (req, res) {

})

// Update role membership
api.put('/ace/:id', function (req, res) {

})

// Remove a role from a user
api.delete('/ace/:id', function (req, res) {

})

module.exports = api
