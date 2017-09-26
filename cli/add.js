const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')
const _ = require('lodash')

const readCommand = async argsOverride => {
  program
    .arguments('<components>')
    .description(`Add component(s) to an app.

    <components> - a space-separated list of one or more components.`)

  program.parse(argsOverride || process.argv)

  return pogram.args
}

module.exports = async argsOverride => {
  const components = await readCommand(argsOverride)

  process.env.NODE_ENV = commandOpts.dev ? 'dev' : (process.env.NODE_ENV || 'production')

  if (_.isEmpty(components)) {
    const eg = colors.bold(`pubsweet add ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  }

  logger.info(`Installing ${components.length} components...`)

  await require('../src/package-management/').add(components)

  logger.info(`${components.length} components installed`)
}
