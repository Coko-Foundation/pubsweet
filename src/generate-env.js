const path = require('path')
const fs = require('fs-extra')
const crypto = require('crypto')
const logger = require('./logger')

module.exports = async () => {
  logger.info('Generating env files')

  const environments = ['dev', 'production', 'test']

  // generate an env file per environment
  const promises = environments.map(async env => {
    // generate a unique secret
    const conf = {
      PUBSWEET_SECRET: crypto.randomBytes(64).toString('hex')
    }

    // generate the output string
    const output = Object.keys(conf).map(key => {
      return [key, conf[key]].join('=')
    }).join('\n')

    // env file per environment, inside the root dir
    const envPath = path.join(process.cwd(), '.env.' + env)

    // write the data to the env file
    await fs.outputFile(envPath, output)
  })

  await Promise.all(promises)

  logger.info('Generated env files')
}
