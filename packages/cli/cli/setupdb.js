const program = require('commander')
const properties = require('../src/schemas').db
const { setupDb } = require('@pubsweet/db-manager')
const db = require('pubsweet-server/src/db')
const config = require('config')
const { forEach, merge } = require('lodash')
const runPrompt = require('../src/run-prompt')

const readCommand = async argsOverride => {
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

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)
  const configOpts = config.has('dbManager') ? config.get('dbManager') : {}

  const promptOverride = merge(configOpts, commandOpts)
  promptOverride.clobber = !!promptOverride.clobber // Always interpret absence of option as clobber = false
  const finalOpts = await runPrompt({ properties, override: promptOverride })

  await setupDb(finalOpts)

  // drain pool to avoid 10 second delay before command exits
  db.end()
}
