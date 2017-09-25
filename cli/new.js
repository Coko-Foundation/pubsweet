const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')
const fs = require('fs-extra')
const spawn = require('child-process-promise').spawn
const path = require('path')

const STARTER_REPO_URL = 'https://gitlab.coko.foundation/pubsweet/pubsweet-starter.git'

const readCommand = async argsOverride => {
  program
    .arguments('[name]')
    .description('Generate a new app in the current working directory with name [name].')
    .option('--clobber', 'Overwrite any existing files')

  program.parse(argsOverride || process.argv)

  const appName = program.args[0]

  if (!appName || appName.length === 0) {
    const eg = colors.bold(`pubsweet new ${colors.italic('myappname')}`)
    throw new Error(`You must specify an app name, e.g. ${eg}`)
  }

  return { appName, clobber: program.clobber }
}

const overWrite = (appName) => {
  if (!fs.statSync(appName).isDirectory()) {
    throw new Error(appName, 'exists in the current directory directory as a file. Will not overwrite.')
  }
  logger.info(`Overwriting directory ${appName} due to --clobber flag`)
  fs.removeSync(appName)
}

module.exports = async argsOverride => {
  const { appName, clobber } = readCommand(argsOverride)

  logger.info(`Generating new PubSweet app: ${appName}`)

  if (clobber) { overWrite(appName) }

  await spawn('git', ['clone', STARTER_REPO_URL, appName], { stdio: 'inherit' })

  logger.info('Installing app dependencies')
  const localYarn = path.join(__dirname, 'node_modules', '.bin', 'yarn')
  await spawn(localYarn, ['--ignore-optional', '--no-progress'], {
    cwd: path.join(process.cwd, appName),
    stdio: 'inherit'
  })

  logger.info('Finished generating initial app')
}
