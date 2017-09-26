const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')

module.exports = async argsOverride => {
  program
    .arguments('<components>')
    .description(`Remove component(s) in an app.

    <components> - a space-separated list of one or more components.`)

  program.parse(argsOverride || process.argv)

  return program.args
}

module.exports = async argsOverride => {
  const components = await readCommand(argsOverride)

  process.env.NODE_ENV = commandOpts.dev ? 'dev' : (process.env.NODE_ENV || 'production')

  if (_.isEmpty(components)) {
    const eg = colors.bold(`pubsweet remove ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  }

  logger.info(`Removing ${components.length} components...`)

  await require('../src/package-management/').remove(components)

  logger.info(`${components.length} components removed`)
}
