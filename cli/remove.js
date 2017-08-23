const logger = require('pubsweet-logger')
const colors = require('colors/safe')
const program = require('commander')

module.exports = async args => {
  program
    .arguments('<components>')
    .description(`Remove component(s) in an app.

    <components> - a space-separated list of one or more components.`)

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  let components = program.args

  if (!components || components.length === 0) {
    const eg = colors.bold(`pubsweet remove ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  }

  logger.info(`Removing ${components.length} components...`)

  await require('../src/remove-components')(components)

  logger.info(`${components.length} components removed`)
}
