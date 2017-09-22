const colors = require('colors/safe')
const program = require('commander')
const properties = require('../src/db-properties')
const { setupDb } = require('db-manager')
const config = require('config')
const _ = require('lodash/fp')
const runPrompt = require('../src/run-prompt')

const readCommand = async argsOverride => {
  program
    .description('Setup a database for a PubSweet app. Run from your project root')
    .option('--dev', 'Generate development mode database')
    .option('--clobber', 'Overwrite any existing database')

  Object.keys(properties).forEach(key => {
    program.option(`--${key} [string]`, properties[key].description)
  })

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)

  process.env.NODE_ENV = commandOpts.dev ? 'dev' : (process.env.NODE_ENV || 'production')

  const configOpts = config.has('dbManager') ? config.get('dbManager') : {}
  const promptOverride = _.merge(configOpts, commandOpts)
  const finalOpts = await runPrompt({properties, override: promptOverride})

  return setupDb(finalOpts)
}
