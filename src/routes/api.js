const path = require('path')
const crypto = require('crypto')
const express = require('express')
const multer = require('multer')

const api = express.Router()

const collection = require('./api_collection')
api.use('/collections', collection)

// File upload API
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({
  storage: storage,
  limits: {fileSize: 10000000, files: 1}
})

api.post('/upload', upload.single('file'), (req, res, next) => {
  return res.send('/' + req.file.path)
})

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
