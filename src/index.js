const logger = require('@pubsweet/logger')
const winston = require('winston')
const { validateConfig } = require('validations')

process.env.PUBSWEET_BACKEND_SILENT = true

logger.configure(winston)
validateConfig()

module.exports = {
  setupDb: require('./setup-db/'),
  addUser: require('./add-user/')
}

