const STATUS = require('http-status-codes')
const express = require('express')
const passport = require('passport')
const sse = require('pubsweet-sse')

const {
  createFilterFromQuery,
  applyPermissionFilter,
  buildChangeData,
  objectId,
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
    // Teams are either based around objects or not,
    // we need to know if they are and around which object
    const target = Object.assign(
      {},
      { path: req.route.path },
      { team: req.body },
    )

    const properties = await applyPermissionFilter({
      req,
      target,
      filterable: req.body,
    })

    const team = new Team(properties)

    await team.save()

    res.status(STATUS.CREATED).json(team)
    sse.send({ action: 'team:create', data: { team } })
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
    sse.send({ action: 'team:delete', data: { team: objectId(team) } })
  } catch (err) {
    next(err)
  }
})

api.patch('/teams/:teamId', authBearer, async (req, res, next) => {
  try {
    const team = await Team.find(req.params.teamId)
    const currentAndUpdate = { current: team, update: req.body }
    const properties = await applyPermissionFilter({
      req,
      target: currentAndUpdate,
      filterable: req.body,
    })

    await team.updateProperties(properties)
    await team.save()

    const update = buildChangeData(properties, team)

    res.status(STATUS.OK).json(update)
    sse.send({
      action: 'team:patch',
      data: { team: objectId(team), update },
    })
  } catch (err) {
    next(err)
  }
})

module.exports = api
