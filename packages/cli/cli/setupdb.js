const program = require('commander')
const properties = require('../src/schemas').db
const { setupDb } = require('@pubsweet/db-manager')
const db = require('pubsweet-server/src/db')
const { forEach } = require('lodash')
const runPrompt = require('../src/run-prompt')

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

  // Always interpret absence of option as clobber = false
  promptOverride.clobber = !!promptOverride.clobber

  const finalOpts = await runPrompt({ properties, override: promptOverride })

  finalOpts.admin = true
  await setupDb(finalOpts)

  // drain pool to avoid 10 second delay before command exits
  db.end()
}
