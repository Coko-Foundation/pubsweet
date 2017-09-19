const path = require('path')
const fs = require('fs-extra')
const crypto = require('crypto')
const logger = require('@pubsweet/logger')
const config = require('config')
const path = require('path')

module.exports = () => {
  const configFilePath = path.join(process.env.NODE_CONFIG_DIR, `local-${process.env.NODE_ENV}.js`)

  logger.info(`Adding pubsweet secret to ${configFilePath}`)

  let configObj
  try {
    configObj = require(configFilePath)
  } catch () {
    logger.info(`No config file found. Creating...`)
    configObj = {}
  }

  const secret = crypto.randomBytes(64).toString('hex')
  configObj['pubsweet-server'].secret = secret
 
  fs.writeFileSync(configFilePath, JSON.stringify(configObj))

  logger.info(`Added secret to ${configFilePath} under pubsweet-server.secret`)
}
