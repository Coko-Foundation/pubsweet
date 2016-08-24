'use strict'

const express = require('express')
const passport = require('passport')
const Authorize = require('../models/Authorize')
const Team = require('../models/Team')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router()
const logger = require('../logger')

api.get('/', authBearer, (req, res, next) => {
  return Authorize.can(
    req.authInfo.id, 'read', req.originalUrl
  ).then(
    () => {
      return Team.all()
    }
  ).then(
    teams => {
      return res.status(200).json(teams)
    }
  ).catch(
    err => {
      next(err)
    }
  )
})

api.post('/', authBearer, (req, res, next) => {
  let team = new Team(req.body)

  return Authorize.can(
    req.authInfo.id, 'create', req.originalUrl
  ).then(
    () => {
      return team.save()
    }
  ).then(
    response => {
      return res.status(201).json(response)
    }
  ).catch(
    err => {
      next(err)
    }
  )
})

api.get('/:id', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'read', req.originalUrl).then(() => {
    return Team.find(req.params.id)
  }).then(team => {
    return res.status(200).json(team)
  }).catch(err => {
    next(err)
  })
})

api.delete('/:id', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'delete', req.originalUrl).then(() => {
    return Team.find(req.params.id)
  }).then(team => {
    return team.delete()
  }).then(team => {
    return res.status(200).json(team)
  }).catch(err => {
    next(err)
  })
})

api.put('/:id', authBearer, (req, res, next) => {
  return Authorize.can(req.user, 'update', req.originalUrl).then(() => {
    return Team.find(req.params.id)
  }).then(team => {
    return team.updateProperties(req.body)
  }).then(team => {
    return team.save()
  }).then(team => {
    return Team.find(req.params.id)
  }).then(team => {
    return res.status(200).json(team)
  }).catch(err => {
    next(err)
  })
})

module.exports = api
