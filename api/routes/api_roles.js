'use strict'

const express = require('express')
const passport = require('passport')
const Authorize = require('../models/authorize')
const User = require('../models/user')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()

// Get user roles
api.get('/:id/roles', authBearer, function (req, res, next) {
  return Authorize.it(req.user, req.originalUrl, 'read').then(function () {
    return User.find(req.params.id)
  }).then(function (user) {
    return user.roles()
  }).then(function (roles) {
    console.log(roles)
    return res.status(200).json(roles)
  }).catch(function (err) {
    next(err)
  })
})

module.exports = api
