const express = require('express')
const api = express.Router()

// Collections
const collection = require('./api_collections')
api.use('/collections', collection)

// File upload API
const upload = require('./api_upload')
api.use('/upload', upload)

// Users API
const users = require('./api_users')
api.use('/users', users)

// Teams
const teams = require('./api_teams')
api.use('/teams', teams)

// Debug API
if (process.env.NODE_ENV === 'dev') {
  api.get('/debug', (req, res, next) => {
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(result => {
      var documents = result.rows.map(result => {
        return result.doc
      })
      return res.json(documents)
    }).catch(err => {
      console.log(err)
    })
  })
}

module.exports = api
