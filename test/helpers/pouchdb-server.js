var PouchDB = require('pouchdb')
var express = require('express')
var logger = require('../../src/logger')

module.exports = () => new Promise((resolve, reject) => {
  logger.info('Starting pouchdb server')

  var app = express()

  app.use('/', require('express-pouchdb')(PouchDB))

  var server = app.listen(12345, 'localhost', () => {
    logger.info('server started')
    resolve(server)
  })

  server.on('error', err => {
    logger.error('error starting pouchdb server', err)
    reject(err)
  })
})
