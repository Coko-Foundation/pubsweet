const logger = require('@pubsweet/logger')
const program = require('commander')
const properties = require('../src/user-properties')
const { addUser } = require('db-manager')
const runPrompt = require('../src/run-prompt')
const _ = require('lodash/fp')

const readCommand = async argsOverride => {
  program
    .description('Add a user to a database of a PubSweet app. Run from your project root')
    .option('--dev', 'Add user to development mode database')

  Object.keys(properties).forEach(key => {
    let value = properties[key]

    if (value.type && value.type === 'boolean') {
      program.option(`--${key}`, properties[key].description)
    } else {
      program.option(`--${key} [string]`, properties[key].description)
    }
  })

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)

  process.env.NODE_ENV = commandOpts.dev ? 'dev' : (process.env.NODE_ENV || 'production')

  const configOpts = config.has('dbManager') ? config.get('dbManager') : {}
  const promptOverride = _.merge(configOpts, commandOpts)
  const finalOpts = await runPrompt({properties, override: promptOverride})

  return createUser(finalOpts)
}
