const STATUS = require('http-status-codes')
const passport = require('passport')

const authLocal = passport.authenticate('local', {
  failWithError: true,
  session: false,
})

const authBearer = passport.authenticate('bearer', { session: false })
const authentication = require('./authentication')

const UsersAPI = app => {
  const User = require('./user')
  const { ValidationError } = require('pubsweet-server')

  const {
    util: {
      applyPermissionFilter,
      fieldSelector,
      createFilterFromQuery,
      authorizationError,
    },
  } = require('pubsweet-server')

  // Register passport authentication strategies
  app.locals.passport.use('bearer', authentication.strategies.bearer)
  app.locals.passport.use('anonymous', authentication.strategies.anonymous)
  app.locals.passport.use('local', authentication.strategies.local)

  // Issue a token
  app.post('/api/users/authenticate', authLocal, async (req, res) => {
    const user = Object.assign(
      { token: authentication.token.create(req.user) },
      req.user,
    )
    req.user = req.user.id
    const properties = await applyPermissionFilter({
      req,
      target: user,
    })

    return res.status(STATUS.CREATED).json(properties)
  })

  // Verify a token
  app.get('/api/users/authenticate', authBearer, async (req, res, next) => {
    try {
      const user = (await User.find(req.user)).toJSON()
      user.token = req.authInfo.token
      res.status(STATUS.OK).json(user)
    } catch (err) {
      next(err)
    }
  })

  // Create a user
  app.post('/api/users', async (req, res, next) => {
    try {
      // TODO: Remove this in favor of checking in authsome
      if (req.body.admin) throw new ValidationError('invalid property: admin')

      const properties = await applyPermissionFilter({
        req,
        target: req.route,
        filterable: req.body,
      })

      let user = new User(properties)

      user = await user.save()
      res.status(STATUS.CREATED).json(user)
    } catch (err) {
      next(err)
    }
  })

  // List users
  app.get('/api/users', authBearer, async (req, res, next) => {
    try {
      const users = await User.all()
      const filteredUsers = await applyPermissionFilter({
        req,
        target: req.route,
        filterable: users,
      })

      const usersWithSelectedFields = (await Promise.all(
        filteredUsers.map(async user => {
          const properties = await applyPermissionFilter({
            req,
            target: user,
          })
          return fieldSelector(req)(properties)
        }),
      )).filter(createFilterFromQuery(req.query))

      res.status(STATUS.OK).json({ users: usersWithSelectedFields })
    } catch (err) {
      next(err)
    }
  })

  // Get a user
  app.get('/api/users/:id', authBearer, async (req, res, next) => {
    try {
      // TODO: Untangle
      const authsome = require('pubsweet-server/src/helpers/authsome')
      const user = await User.find(req.params.id)
      const permission = await authsome.can(req.user, req.method, user)

      const properties = await applyPermissionFilter({
        req,
        target: user,
      })

      if (!permission) {
        throw authorizationError(req.user, req.method, req.path)
      }

      res.status(STATUS.OK).json(properties)
    } catch (err) {
      next(err)
    }
  })

  // Delete a user
  app.delete('/api/users/:id', authBearer, async (req, res, next) => {
    try {
      // TODO: Untangle
      const authsome = require('pubsweet-server/src/helpers/authsome')

      let user = await User.find(req.params.id)
      const permission = await authsome.can(req.user, req.method, user)

      if (!permission) {
        throw authorizationError(req.user, req.method, req.path)
      }
      user = await user.delete()
      res.status(STATUS.OK).json(user)
    } catch (err) {
      next(err)
    }
  })

  // Patch a user
  app.patch('/api/users/:id', authBearer, async (req, res, next) => {
    try {
      let user = await User.find(req.params.id)

      const currentAndUpdate = { current: user, update: req.body }
      const properties = await applyPermissionFilter({
        req,
        target: currentAndUpdate,
        filterable: req.body,
      })

      user = await user.updateProperties(properties)
      user = await user.save()
      user = await User.find(req.params.id)

      res.status(STATUS.OK).json(user)
    } catch (err) {
      next(err)
    }
  })
}

module.exports = UsersAPI
