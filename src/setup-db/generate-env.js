const path = require('path')
const fs = require('fs-extra')
const crypto = require('crypto')
const logger = require('@pubsweet/logger')
const config = require('config')
const _ = require('lodash/fp')

module.exports = () => {
  const configFilePath = path.join(process.cwd(), 'config', `local-${process.env.NODE_ENV}.json`)
  logger.info(`Adding pubsweet secret to ${configFilePath}`)

  let configObj
  try {
    configObj = require(configFilePath)
  } catch (e) {
    logger.info(`No config file found. Creating...`)
    configObj = {}
  }

  const secret = crypto.randomBytes(64).toString('hex')
  _.set('pubsweet-server.secret', secret, configObj)
 
  fs.writeJsonSync(configFilePath, configObj)

  logger.info(`Added secret to ${configFilePath} under pubsweet-server.secret`)
}
