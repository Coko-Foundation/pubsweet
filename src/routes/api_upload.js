const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const passport = require('passport')
const express = require('express')
const api = express.Router()

const authBearer = passport.authenticate('bearer', {session: false})

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 10000000, files: 1}
})

api.post('', authBearer, upload.single('file'), (req, res, next) => {
  return res.send('/' + req.file.path)
})

module.exports = api
