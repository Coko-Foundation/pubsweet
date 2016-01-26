const express = require('express')
const router = express.Router()
const path = require('path')

/* GET home page. */
router.get('*', function (req, res, next) {
  return res.sendFile('index.html', { root: path.join(__dirname, '../app') })
})

module.exports = router
