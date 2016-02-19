const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const api = require('./routes/api')
const admin = require('./routes/admin')

const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('./models/user')

// const favicon = require('serve-favicon')
const app = express()

// uncomment after placing your favicon in /public
// app.use(favicon (path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(passport.initialize())

// Passport strategies

const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy

passport.use('bearer', new BearerStrategy(
  function (token, done) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (!err) {
        return done(null, decoded.username)
      } else {
        return done(null)
      }
    })
  }
))

// Passport.js configuration (auth)
passport.use('local', new LocalStrategy(function (username, password, done) {
  console.log('User finding', username, password)
  User.findByUsername(username).then(function (user) {
    console.log('User found', user)
    if (!user) {
      return done(null, false, { message: 'Wrong username.' })
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Wrong password.' })
    }
    console.log('User returned', user)
    return done(null, user)
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
if (app.get('env') === 'development' || app.get('env') === 'test') {
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
