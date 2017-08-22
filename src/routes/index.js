const express = require('express')
const router = express.Router()
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  var filename = path.join('.', '_build', 'assets')
} else {
  filename = path.join('.', 'app')
}

router.get('*', (req, res, next) => {
  return res.sendFile('index.html', { root: filename })
})

module.exports = router
