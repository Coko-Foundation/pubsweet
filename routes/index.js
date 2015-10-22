const express = require('express')
const router = express.Router()
// const App = require('../public/assets/app.server')

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.locals.data = { data }
  // next()
})

// This is where the magic happens. We take the locals data we have already
// fetched and seed our stores with data.
// App is a function that requires store data and url to initialize and return
// the React-rendered html string

router.get('/', function (req, res, next) {
})

module.exports = router
