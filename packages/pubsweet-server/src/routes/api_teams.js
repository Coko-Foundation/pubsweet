'use strict'
const STATUS = require('http-status-codes')
const express = require('express')
const passport = require('passport')

const authsome = require('../helpers/authsome')
const Team = require('../models/Team')
const { createFilterFromQuery, authorizationError } = require('./util')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router({mergeParams: true})

api.get('/teams', authBearer, async (req, res, next) => {
  try {
    const permission = await authsome.can(
      req.user,
      req.method,
      {path: req.path, params: req.params}
    )

    if (!permission) {
      throw authorizationError(req.user, req.method, req)
    }

    const teams = (await Team.all())
      .filter(createFilterFromQuery(req.query))

    res.status(STATUS.OK).json(teams)
  } catch (err) {
    next(err)
  }
})

api.post('/teams', authBearer, async (req, res, next) => {
  try {
    const permission = await authsome.can(req.user, req.method, req.body)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.params)
    }

    if (permission.filter) {
      req.body = permission.filter(req.body)
    }

    let team = new Team(req.body)
    team = await team.save()

    res.status(STATUS.CREATED).json(team)
  } catch (err) {
    next(err)
  }
})

api.get('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    let team = await Team.find(req.params.teamId)
    const permission = await authsome.can(req.user, req.method, team)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.params)
    }

    if (permission.filter) {
      team = permission.filter(team)
    }

    res.status(STATUS.OK).json(team)
  } catch (err) {
    next(err)
  }
})

api.delete('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    let team = await Team.find(req.params.teamId)
    const permission = await authsome.can(req.user, req.method, team)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.params)
    }

    team = await team.delete()

    res.status(STATUS.OK).json(team)
  } catch (err) {
    next(err)
  }
})

api.patch('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    let team = await Team.find(req.params.teamId)
    const permission = await authsome.can(req.user, req.method, team)

    if (!permission) {
      throw authorizationError(req.user, req.method, req.params)
    }

    team = await team.updateProperties(req.body)
    team = await team.save()

    res.status(STATUS.OK).json(team)
  } catch (err) {
    next(err)
  }
})

module.exports = api
