const express = require('express')

const users = require('./api_users')
const acl = require('./api_acl')
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

// ACL API
api.use('/acl', acl)

module.exports = api
