const logger = require('../src/logger')
const colors = require('colors/safe')
const program = require('commander')

module.exports = args => {
  program
    .arguments('<components>')
    .description(`Add component(s) to an app.

    <components> - a space-separated list of one or more components.`)

  program.parse(args || process.argv)

  let components = program.args
  if (!components || components.length === 0) {
    const eg = colors.bold(`pubsweet add ${colors.italic('login signup blog')}`)
    throw new Error(`You must specify one or more components, e.g. ${eg}`)
  } else {
    logger.info(`Installing ${components.length} components...`)
  }

  const add = require('../src/add-components')
  const done = () => logger.info(`All ${components.length} components installed`)

  return add(components).then(done)
}
