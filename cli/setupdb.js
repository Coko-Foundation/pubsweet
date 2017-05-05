const logger = require('../src/logger')
const colors = require('colors/safe')
const program = require('commander')
const properties = require('../src/db-properties')

module.exports = args => {
  program
    .arguments('[path]')
    .description('Setup a database for your PubSweet app, [path] should be the root of the app')
    .option('--dev', 'Generate development mode database')
    .option('--clobber', 'Overwrite any existing database')

  for (const key in properties) {
    program.option(`--${key} [string]`, properties[key].description)
  }

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  const appPath = program.args[0]

  if (!appPath || appPath.length === 0) {
    const eg = colors.bold(`pubsweet setupdb ${colors.italic('./myapp')}`)
    throw new Error(`You must specify an app path, e.g. ${eg}`)
  }

  logger.info('Generating PubSweet app database at path', require('../src/db-path')(appPath))

  return require('../src/newdb')({
    appPath: appPath,
    properties: require('../src/db-properties'),
    override: program
  })
}
