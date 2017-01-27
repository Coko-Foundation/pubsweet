// Config

const path = require('path')
const logger = require('./src/logger')

let envs = ['test', 'dev', 'stage', 'production']

if (!envs.includes(process.env.NODE_ENV)) {
  logger.error('The current NODE_ENV value is invalid')
}

let envConfig = require(path.join(__dirname, 'config', process.env.NODE_ENV + '.js'))

module.exports = envConfig
