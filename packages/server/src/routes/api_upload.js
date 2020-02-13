const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const passport = require('passport')
const express = require('express')
const config = require('config')

const api = express.Router()

const authBearer = passport.authenticate('bearer', { session: false })

const storage = multer.diskStorage({
  destination: config.get('pubsweet-server').uploads,
  filename(req, file, cb) {
    crypto.randomBytes(16, (err, raw) => {
      if (err) {
        cb(err)
        return
      }

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10000000, files: 1 },
})

api.post('/upload', authBearer, upload.single('file'), (req, res, next) =>
  res.send(`/${req.file.path}`),
)

module.exports = api
