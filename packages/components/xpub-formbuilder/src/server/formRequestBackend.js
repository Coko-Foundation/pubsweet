// const { pick } = require('lodash')
const config = require('config')
const passport = require('passport')
// const logger = require('@pubsweet/logger')
// const User = require('pubsweet-server/src/models/User')
// const authsome = require('pubsweet-server/src/helpers/authsome')
// const AuthorizationError = require('pubsweet-server/src/errors/AuthorizationError')
const fs = require('fs')

const authBearer = passport.authenticate('bearer', { session: false })

module.exports = app => {
  app.get('/api/get-forms', authBearer, async (req, res, next) => {
    try {
      const forms = JSON.parse(
        fs.readFileSync(
          `${config.get(
            'pubsweet-component-xpub-formbuilder.path',
          )}/form-submit.json}`,
          'utf8',
        ),
      )
      res.send({
        forms,
      })
    } catch (err) {
      next(err)
    }
  })

  app.patch('/api/update-forms', authBearer, async (req, res, next) => {
    try {
      const forms = JSON.parse(
        fs.readFileSync(
          `${config.get(
            'pubsweet-component-xpub-formbuilder.path',
          )}/form-submit.json}`,
          'utf8',
        ),
      )
      res.send({
        forms,
      })
    } catch (err) {
      next(err)
    }
  })

  app.post('/api/create-forms', authBearer, async (req, res, next) => {
    try {
      const forms = JSON.parse(
        fs.readFileSync(
          `${config.get(
            'pubsweet-component-xpub-formbuilder.path',
          )}/form-submit.json}`,
          'utf8',
        ),
      )
      res.send({
        forms,
      })
    } catch (err) {
      next(err)
    }
  })

  app.remove('/api/delete-forms', authBearer, async (req, res, next) => {
    try {
      const forms = JSON.parse(
        fs.readFileSync(
          `${config.get(
            'pubsweet-component-xpub-formbuilder.path',
          )}/form-submit.json}`,
          'utf8',
        ),
      )
      res.send({
        forms,
      })
    } catch (err) {
      next(err)
    }
  })
}
