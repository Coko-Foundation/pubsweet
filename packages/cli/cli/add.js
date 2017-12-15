const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')
const _ = require('lodash')

const readCommand = async argsOverride => {
  program.arguments('<components>').description(`Add component(s) to an app.

    <components> - a space-separated list of one or more components.`)

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  const commandOpts = await readCommand(argsOverride)
  const components = commandOpts.args

  if (_.isEmpty(components)) {
    const eg = colors.bold(`pubsweet add ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  }

  logger.info(`Installing ${components.length} components...`)

  require('../src/package-management/').add(components)

  logger.info(`Success: ${components.length} components installed`)
}
