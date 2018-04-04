const STATUS = require('http-status-codes')
const express = require('express')
const passport = require('passport')

const {
  createFilterFromQuery,
  applyPermissionFilter,
  buildChangeData,
} = require('./util')
const Team = require('../models/Team')

const authBearer = passport.authenticate('bearer', { session: false })
const api = express.Router({ mergeParams: true })

api.get('/teams', authBearer, async (req, res, next) => {
  try {
    const teams = await Team.all()
    const filteredTeams = await applyPermissionFilter({
      req,
      target: req.route,
      filterable: teams,
    })

    filteredTeams.filter(createFilterFromQuery(req.query))

    res.status(STATUS.OK).json(filteredTeams)
  } catch (err) {
    next(err)
  }
})

api.post('/teams', authBearer, async (req, res, next) => {
  try {
    const properties = await applyPermissionFilter({
      req,
      target: req.route,
      filterable: req.body,
    })

    const team = new Team(properties)

    await team.save()

    res.status(STATUS.CREATED).json(team)
  } catch (err) {
    next(err)
  }
})

api.get('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    const team = await Team.find(req.params.teamId)
    const properties = await applyPermissionFilter({
      req,
      target: team,
    })

    res.status(STATUS.OK).json(properties)
  } catch (err) {
    next(err)
  }
})

api.delete('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    const team = await Team.find(req.params.teamId)
    const output = await applyPermissionFilter({ req, target: team })

    await team.delete()

    res.status(STATUS.OK).json(output)
  } catch (err) {
    next(err)
  }
})

api.patch('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    const team = await Team.find(req.params.teamId)
    const properties = await applyPermissionFilter({
      req,
      target: team,
      filterable: req.body,
    })

    await team.updateProperties(properties)
    await team.save()

    const updated = buildChangeData(properties, team)

    res.status(STATUS.OK).json(updated)
  } catch (err) {
    next(err)
  }
})

module.exports = api
