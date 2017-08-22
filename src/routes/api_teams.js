'use strict'

const STATUS = require('http-status-codes')
const express = require('express')
const passport = require('passport')
const Authorize = require('../models/Authorize')
const Team = require('../models/Team')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()

api.get('/', authBearer, (req, res, next) => {
  return Authorize.can(
    req.authInfo.id, 'read', req.originalUrl
  ).then(
    () => Team.all()
  ).then(
    teams => res.status(STATUS.OK).json(teams)
  ).catch(
    next
  )
})

api.post('/', authBearer, (req, res, next) => {
  let team = new Team(req.body)

  return Authorize.can(
    req.authInfo.id, 'create', req.originalUrl
  ).then(
    () => team.save()
  ).then(
    response => res.status(STATUS.CREATED).json(response)
  ).catch(
    next
  )
})

api.get('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'read', req.originalUrl
  ).then(
    () => Team.find(req.params.id)
  ).then(
    team => res.status(STATUS.OK).json(team)
  ).catch(
    next
  )
})

api.delete('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'delete', req.originalUrl
  ).then(
    () => Team.find(req.params.id)
  ).then(
    team => team.delete()
  ).then(
    team => res.status(STATUS.OK).json(team)
  ).catch(
    next
  )
})

// deprecated - use PATCH instead
api.put('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'update', req.originalUrl
  ).then(
    () => Team.find(req.params.id)
  ).then(
    team => team.updateProperties(req.body)
  ).then(
    team => team.save()
  ).then(
    team => Team.find(req.params.id)
  ).then(
    team => res.status(STATUS.OK).json(team)
  ).catch(
    next
  )
})

api.patch('/:id', authBearer, (req, res, next) => {
  return Authorize.can(
    req.user, 'update', req.originalUrl
  ).then(
    () => Team.find(req.params.id)
  ).then(
    team => team.updateProperties(req.body)
  ).then(
    team => team.save()
  ).then(
    team => Team.find(req.params.id)
  ).then(
    team => res.status(STATUS.OK).json(team)
  ).catch(
    next
  )
})

module.exports = api
