const path = require('path')
const fs = require('fs-extra')
const crypto = require('crypto')
const logger = require('@pubsweet/logger')
const _ = require('lodash/fp')
const config = require('config')

module.exports = () => {
  if (
    config.has('pubsweet-server.secret') &&
    config.get('pubsweet-server.secret')
  ) {
    logger.info('Using existing secret from config')
    return
  }

  const configFilePath = path.join(
    config.util.getEnv('NODE_CONFIG_DIR'),
    `local-${config.util.getEnv('NODE_ENV')}.json`,
  )
  logger.info(`Adding pubsweet secret to ${configFilePath}`)

  let configObj
  try {
    configObj = require(configFilePath)
  } catch (e) {
    logger.info(`No config file found. Creating...`)
    configObj = {}
  }

  const secret = crypto.randomBytes(64).toString('hex')
  const newConfig = _.set('pubsweet-server.secret', secret, configObj)

  fs.writeJsonSync(configFilePath, newConfig)

  logger.info(`Added secret to ${configFilePath} under pubsweet-server.secret`)
}