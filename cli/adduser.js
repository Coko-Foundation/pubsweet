const logger = require('pubsweet-logger')
const colors = require('colors/safe')
const program = require('commander')
const properties = require('../src/user-properties')

module.exports = async args => {
  program
    .arguments('[path]')
    .description('Add a user to the database for pubsweet app at [path].')
    .option('--dev', 'Add user to development mode database')

  Object.keys(properties).forEach(key => {
    let value = properties[key]

    if (value.type && value.type === 'boolean') {
      program.option(`--${key}`, properties[key].description)
    } else {
      program.option(`--${key} [string]`, properties[key].description)
    }
  })

  program.parse(args || process.argv)

  process.env.NODE_ENV = program.dev ? 'dev' : 'production'

  const appPath = program.args[0]

  if (!appPath || appPath.length === 0) {
    const eg = colors.bold(`pubsweet adduser ${colors.italic('./myapp')}`)
    throw new Error(`You must specify an app path, e.g. ${eg}`)
  }

  logger.info('Adding user to database of the app at path', appPath)

  await require('../src/add-user')({
    appPath: appPath,
    properties: require('../src/user-properties'),
    override: program
  })
}
