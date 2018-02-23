const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')
const fs = require('fs-extra')
const { spawnSync } = require('child_process')
const path = require('path')
const crypto = require('crypto')
const { STARTER_REPO_URL } = require('../src/constants')

const readCommand = async argsOverride => {
  program
    .arguments('[name]')
    .description(
      'Generate a new app in the current working directory with name [name].',
    )
    .option('--clobber', 'Overwrite any existing files')

  program.parse(argsOverride || process.argv)

  const appName = program.args[0]

  if (!appName) {
    const eg = colors.bold(`pubsweet new ${colors.italic('myappname')}`)
    throw new Error(`You must specify an app name, e.g. ${eg}`)
  }

  return { appName, clobber: program.clobber }
}

const overWrite = appPath => {
  if (!fs.statSync(appPath).isDirectory()) {
    throw new Error(`${appPath} exists as a file. Will not overwrite.`)
  }
  logger.info(`Overwriting ${appPath} due to --clobber flag`)
  fs.removeSync(appPath)
}

module.exports = async argsOverride => {
  const { appName, clobber } = await readCommand(argsOverride)
  logger.info(`Generating new PubSweet app: ${appName}`)

  const appPath = path.join(process.cwd(), appName)

  if (clobber) {
    overWrite(appPath)
  }

  spawnSync('git', ['clone', STARTER_REPO_URL, appName], { stdio: 'inherit' })

  logger.info('Installing app dependencies')

  // TODO: There is an error when using local yarn. Fix it.
  // const localYarn = path.join(__dirname, '..', 'node_modules', '.bin', 'yarn')
  spawnSync('yarn', ['install'], {
    cwd: appPath,
    stdio: 'inherit',
  })

  // generate secret
  const configFilePath = path.join(appPath, 'config', `local.json`)
  const secret = crypto.randomBytes(64).toString('hex')
  fs.writeJsonSync(configFilePath, { secret })
  logger.info(`Added secret to ${configFilePath} under pubsweet-server.secret`)

  logger.info('Finished generating initial app')
}
