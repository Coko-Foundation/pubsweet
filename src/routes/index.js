const express = require('express')
const router = express.Router({mergeParams: true})
const path = require('path')
const config = require('config')

const filename = config.get('NODE_ENV') === 'production'
  ? path.join('.', '_build', 'assets')
  : path.join('.', 'app')

router.get('*', (req, res, next) => {
  return res.sendFile('index.html', { root: filename })
})

module.exports = router
