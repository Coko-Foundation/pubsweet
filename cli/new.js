const logger = require('../src/logger')
const colors = require('colors/safe')
const program = require('commander')
const properties = require('../src/db-properties')

module.exports = args => {
  program
  
    .arguments('[name]')
    .description('Generate a new app in directory [name].')
    .option('--dev', 'Setup app for development')
    .option('--clobber', 'Overwrite any existing files')

  for (const key in properties) {
    program.option(`--${key} [string]`, properties[key].description)
  }

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  const appname = program.args[0]

  if (!appname || appname.length === 0) {
    const eg = colors.bold(`pubsweet new ${colors.italic('myappname')}`)
    throw new Error(`You must specify an app name, e.g. ${eg}`)
  }

  logger.info('Generating new PubSweet app:', appname)

  return require('../src/newapp')({
    appPath: appname,
    properties: require('../src/db-properties'),
    override: program
  })
}
