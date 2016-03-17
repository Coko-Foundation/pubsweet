const express = require('express')

const users = require('./api_users')
const collection = require('./api_collection')

const api = express.Router()

api.use('/', collection)

// File upload API
var multer = require('multer')
var upload = multer({
  dest: 'public/uploads/',
  limits: {fileSize: 1000000, files: 1}
})

api.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file)
  return res.send(req.file.path.replace(/^public/, ''))
})

// Users API
api.use('/users', users)

// Debug API
if (process.env.NODE_ENV === 'dev') {
  api.get('/debug', function (req, res, next) {
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      var documents = result.rows.map(function (result) {
        return result.doc
      })
      return res.json(documents)
    }).catch(function (err) {
      console.log(err)
    })
  })
}

module.exports = api
