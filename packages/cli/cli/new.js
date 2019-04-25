const logger = require('@pubsweet/logger')
const colors = require('colors/safe')
const program = require('commander')
const fs = require('fs-extra')
const { execSync } = require('child_process')
const path = require('path')
const crypto = require('crypto')

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

  execSync(
    `git clone https://gitlab.coko.foundation/pubsweet/pubsweet-starter.git --branch release ${appName} --quiet`,
    { stdio: 'inherit' },
  )

  // Reinitialize the repository
  await fs.remove(`${appName}/.git`)
  execSync(`git init ${appName}`, { stdio: 'inherit' })

  logger.info('Installing app dependencies')

  execSync('yarn install', {
    cwd: appPath,
    stdio: 'inherit',
  })

  // generate secret
  const configFilePath = path.join(appPath, 'config', `local.json`)
  const secret = crypto.randomBytes(64).toString('hex')
  fs.writeJsonSync(configFilePath, { 'pubsweet-server': { secret } })
  logger.info(`Added secret to ${configFilePath} under pubsweet-server.secret`)
  logger.info('Finished generating initial app')
}
