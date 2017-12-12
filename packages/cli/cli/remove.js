const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')
const _ = require('lodash')

const readCommand = async argsOverride => {
  program
    .arguments('<components>')
    .description(`Remove component(s) in an app.

    <components> - a space-separated list of one or more components.`)

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)
  const components = commandOpts.args

  if (_.isEmpty(components)) {
    const eg = colors.bold(`pubsweet remove ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  }

  logger.info(`Removing ${components.length} components...`)

  require('../src/package-management/').remove(components)

  logger.info(`Success: ${components.length} components removed`)
}
