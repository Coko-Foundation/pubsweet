const express = require('express')
const api = express.Router()

// Collections
const collections = require('./api_collections')
api.use(collections)

// File upload API
const upload = require('./api_upload')
api.use('/upload', upload)

// Users API
const users = require('./api_users')
api.use('/users', users)

// Teams
const teams = require('./api_teams')
api.use('/teams', teams)

module.exports = api
