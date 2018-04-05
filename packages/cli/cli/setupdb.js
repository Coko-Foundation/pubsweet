const program = require('commander')
const properties = require('../src/schemas').db
const { setupDb } = require('@pubsweet/db-manager')
const db = require('pubsweet-server/src/db')
const config = require('config')
const { some, forEach } = require('lodash')
const runPrompt = require('../src/run-prompt')
const dbExists = require('@pubsweet/db-manager/src/helpers/db-exists')
const logger = require('@pubsweet/logger')

module.exports = async (commandArguments = process.argv) => {
  program.description(
    'Setup a database for a PubSweet app. Run from your project root',
  )

  forEach(properties, (value, key) => {
    if (value.type === 'boolean') {
      program.option(`--${key}`, value.description)
    } else {
      program.option(`--${key} [string]`, value.description)
    }
  })

  const promptOverride = program.parse(commandArguments)
  const configOpts = config.has('dbManager') ? config.get('dbManager') : {}

  // We can only clobber if either is set (by prompt or config)
  const clobbering = some([promptOverride.clobber, configOpts.clobber])

  if ((await dbExists()) && !clobbering) {
    logger.error(
      'If you want to overwrite the database, set clobber option to true',
    )
    throw new Error('Target database already exists, not clobbering')
  }

  const finalOpts = await runPrompt({ properties, override: promptOverride })

  finalOpts.admin = true
  await setupDb(finalOpts)

  // drain pool to avoid 10 second delay before command exits
  db.end()
}
