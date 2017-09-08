const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')

module.exports = async args => {
  program
    .arguments('<components>')
    .description(`Add component(s) to an app.

    <components> - a space-separated list of one or more components.`)

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  let components = program.args

  if (!components || components.length === 0) {
    const eg = colors.bold(`pubsweet add ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  }

  logger.info(`Installing ${components.length} components...`)

  await require('../src/add-components')(components)

  logger.info(`All ${components.length} components installed`)
}
