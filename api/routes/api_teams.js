'use strict'

const express = require('express')
const passport = require('passport')
const Authorize = require('../models/Authorize')
const Team = require('../models/Team')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()

api.get('/', authBearer, function (req, res, next) {
  return Authorize.can(req.authInfo.id, 'read', req.originalUrl).then(function () {
    return Team.all()
  }).then(function (teams) {
    return res.status(200).json(teams)
  }).catch(function (err) {
    next(err)
  })
})

api.post('/', function (req, res, next) {
  let team = new Team(req.body)

  return Authorize.can(req.authInfo.id, 'create', req.originalUrl).then(function () {
    return team.save()
  }).then(function (response) {
    return res.status(201).json(response)
  }).catch(function (err) {
    next(err)
  })
})

api.get('/:id', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'read', req.originalUrl).then(function () {
    return Team.find(req.params.id)
  }).then(function (team) {
    return res.status(200).json(team)
  }).catch(function (err) {
    next(err)
  })
})

api.delete('/:id', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'delete', req.originalUrl).then(function () {
    return Team.find(req.params.id)
  }).then(function (team) {
    return team.delete()
  }).then(function (team) {
    return res.status(200).json(team)
  }).catch(function (err) {
    next(err)
  })
})

api.put('/:id', authBearer, function (req, res, next) {
  return Authorize.can(req.user, 'update', req.originalUrl).then(function () {
    return Team.find(req.params.id)
  }).then(function (team) {
    return team.updateProperties(req.body)
  }).then(function (team) {
    return team.save()
  }).then(function (team) {
    return Team.find(req.params.id)
  }).then(function (team) {
    return res.status(200).json(team)
  }).catch(function (err) {
    next(err)
  })
})

module.exports = api
