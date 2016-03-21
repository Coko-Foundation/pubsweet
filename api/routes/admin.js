const express = require('express')
const router = express.Router()
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  var filename = path.join(__dirname, '../../public/assets')
} else {
  filename = path.join(__dirname, '../../app')
}

router.get('*', function (req, res, next) {
  return res.sendFile('index.html', { root: filename })
})

module.exports = router
