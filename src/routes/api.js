const express = require('express')

const api = express.Router()

const collection = require('./api_collection')
api.use('/', collection)

// File upload API
var multer = require('multer')
var upload = multer({
  dest: '_build/uploads/',
  limits: {fileSize: 10000000, files: 1}
})

api.post('/upload', upload.single('file'), (req, res, next) => {
  console.log(req.file)
  return res.send(req.file.path.replace(/^_build/, ''))
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
