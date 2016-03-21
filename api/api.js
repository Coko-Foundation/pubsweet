const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const webpack = require('webpack')

const index = require('./routes/index')
const api = require('./routes/api')
const admin = require('./routes/admin')

const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('./models/User')

// const favicon = require('serve-favicon')
const app = express()

global.versions = {}

// uncomment after placing your favicon in /public
// app.use(favicon (path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Webpack development support
if (process.env.NODE_ENV === 'dev') {
  var webpackConfig = require('../webpack/webpack.dev.config.js')
  var compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/assets/'
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}

app.use(express.static(path.join(__dirname, '..', 'public')))

// Passport strategies
app.use(passport.initialize())
const BearerStrategy = require('passport-http-bearer').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy
const LocalStrategy = require('passport-local').Strategy

passport.use('bearer', new BearerStrategy(
  function (token, done) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (!err) {
        return done(null, decoded.username, {id: decoded.id})
      } else {
        return done(null)
      }
    })
  }
))

passport.use('anonymous', new AnonymousStrategy())

passport.use('local', new LocalStrategy(function (username, password, done) {
  console.log('User finding', username, password)
  User.findByUsername(username).then(function (user) {
    console.log('User found', user)
    if (!user) {
      return done(null, false, { message: 'Wrong username.' })
    }
    if (!user.validPassword(password)) {
      console.log('invalid password', password, user.passwordHash)
      return done(null, false, { message: 'Wrong password.' })
    }
    console.log('User returned', user)
    return done(null, user, {id: user._id})
  }).catch(function (err) {
    console.log('User not found', err)
    if (err) { return done(err) }
  })
}))

// Main APIs
app.use('/api', api)
app.use('/admin', admin)
app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'dev' || app.get('env') === 'test') {
  app.use(function (err, req, res, next) {
    console.log(err.stack)
    if (err.name === 'AuthorizationError') {
      res.status(403).json({message: err.message})
    } else {
      res.status(err.status || 500).json({message: err.message})
    }
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  console.log(err.stack)
  if (err.name === 'AuthorizationError') {
    res.status(403).json({message: err.message})
  } else {
    res.status(err.status || 500).json({message: err.message})
  }
})

module.exports = app
