const program = require('commander')
const properties = require('../src/schemas/').db
const { setupDb } = require('@pubsweet/db-manager')
const config = require('config')
const _ = require('lodash')
const runPrompt = require('../src/run-prompt')
const dbExists = require('@pubsweet/db-manager/src/helpers/db-exists')
const logger = require('@pubsweet/logger')

const readCommand = async argsOverride => {
  program.description(
    'Setup a database for a PubSweet app. Run from your project root',
  )

  _.forEach(properties, (value, key) => {
    if (value.type === 'boolean') {
      program.option(`--${key}`, value.description)
    } else {
      program.option(`--${key} [string]`, value.description)
    }
  })

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)
  commandOpts.clobber = !!commandOpts.clobber // Always interpret absence of option as clobber = false

  const configOpts = config.has('dbManager') ? config.get('dbManager') : {}
  const promptOverride = _.merge(configOpts, commandOpts)

  if ((await dbExists()) && !commandOpts.clobber) {
    logger.error(
      'If you want to overwrite the database, set clobber option to true',
    )
    throw new Error('Target database already exists, not clobbering')
  }

  const finalOpts = await runPrompt({ properties, override: promptOverride })

  return setupDb(finalOpts)
}
