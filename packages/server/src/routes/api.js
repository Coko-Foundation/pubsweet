const express = require('express')
const helmet = require('helmet')

const api = express.Router({ mergeParams: true })

api.use(helmet())

// File upload API
const upload = require('./api_upload')

api.use(upload)

module.exports = api
