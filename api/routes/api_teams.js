'use strict'

const express = require('express')
const passport = require('passport')
const Authorize = require('../models/Authorize')
const Team = require('../models/Team')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()

// Get user roles
api.get('/teams', authBearer, function (req, res, next) {
  return Authorize.can(req.authInfo.id, 'read', req.originalUrl).then(function () {
    return Team.all()
  }).then(function (teams) {
    return res.status(200).json(teams)
  }).catch(function (err) {
    next(err)
  })
})

module.exports = api
