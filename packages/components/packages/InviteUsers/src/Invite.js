const bodyParser = require('body-parser')

const Invite = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post(
    '/api/users/invite/:collectionId?',
    authBearer,
    require('./routes/post')(app.locals.models),
  )
  app.get('/api/users/invite', require('./routes/get')(app.locals.models))
  app.post(
    '/api/users/invite/password/reset',
    bodyParser.json(),
    require('./routes/reset')(app.locals.models),
  )
}

module.exports = Invite
