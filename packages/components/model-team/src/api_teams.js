const STATUS = require('http-status-codes')
const passport = require('passport')
const sse = require('pubsweet-sse')

const authBearer = passport.authenticate('bearer', { session: false })

const TeamsAPI = app => {
  const Team = require('./team')

  const {
    util: {
      createFilterFromQuery,
      applyPermissionFilter,
      buildChangeData,
      objectId,
    },
  } = require('pubsweet-server')

  app.get('/api/teams', authBearer, async (req, res, next) => {
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

  app.post('/api/teams', authBearer, async (req, res, next) => {
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

      let team = new Team(properties)
      team = await team.save()

      res.status(STATUS.CREATED).json(team)
      sse.send({ action: 'team:create', data: { team } })
    } catch (err) {
      next(err)
    }
  })

  app.get('/api/teams/:teamId', authBearer, async (req, res, next) => {
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

  app.delete('/api/teams/:teamId', authBearer, async (req, res, next) => {
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

  app.patch('/api/teams/:teamId', authBearer, async (req, res, next) => {
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
}

module.exports = TeamsAPI
