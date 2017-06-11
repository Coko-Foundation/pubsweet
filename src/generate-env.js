const path = require('path')
const fs = require('fs-extra')
const crypto = require('crypto')
const logger = require('./logger')

const envDir = process.cwd() // TODO: require this from a module?

module.exports = async () => {
  const env = process.env.NODE_ENV

  logger.info('Generating env file for', env)

  // generate a unique secret
  const conf = {
    PUBSWEET_SECRET: crypto.randomBytes(64).toString('hex')
  }

  // generate the output string
  const output = Object.keys(conf).map(key => {
    return [key, conf[key]].join('=')
  }).join('\n')

  // env file per environment, inside the root dir
  const envPath = path.join(envDir, '.env.' + env)

  // write the data to the env file
  await fs.outputFile(envPath, output)

  logger.info('Generated env files')
}
