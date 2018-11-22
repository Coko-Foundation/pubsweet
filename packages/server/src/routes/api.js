const express = require('express')
const helmet = require('helmet')

const api = express.Router({ mergeParams: true })

api.use(helmet())

// Collections
const collections = require('./api_collections')

api.use(collections)

// Fragments
const fragments = require('./api_fragments')

api.use(fragments)

// File upload API
const upload = require('./api_upload')

api.use(upload)

module.exports = api
