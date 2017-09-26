const program = require('commander')
const properties = require('../src/schemas/').user
const { addUser } = require('@pubsweet/db-manager')
const runPrompt = require('../src/run-prompt')
const _ = require('lodash')
const config = require('config')

const readCommand = async argsOverride => {
  program
    .description('Add a user to a database of a PubSweet app. Run from your project root')
    .option('--dev', 'Add user to development mode database')

  _.forEach(properties, (value, key) => {
    if (_.get('type', value) === 'boolean') {
      program.option(`--${key}`, value.description)
    } else {
      program.option(`--${key} [string]`, value.description)
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

  return addUser(finalOpts)
}
