const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const spawn = require('child-process-promise').spawn
const logger = require('@pubsweet/logger')
const { isRepo, resolveName, getDepsFromPackageJson } = require('./helpers/')

const install = async names => {
  logger.info('Adding components:', names)
  await spawn('yarn', ['add'].concat(names), { stdio: 'inherit' })
  logger.info('Finished adding components')
}

const updateConfig = addedComponents => {
  const configFile = path.join(process.cwd(), 'config', 'components.json')
  logger.info(`Adding new components to ${configFile}`)
  fs.ensureFileSync(configFile)
  const oldComponents = fs.readJsonSync(configFile, {throws: false})
  const newComponents = _.union(oldComponents, addedComponents)
  fs.writeJsonSync(configFile, newComponents, {spaces: '\t'})
  logger.info('Finished updating components.json config')
}

module.exports = async components => {
  try {
    const names = components.map(resolveName)
    const oldModules = getDepsFromPackageJson()
    await install(names)
    const newModules = getDepsFromPackageJson()
    const addedModules = _.difference(_.keys(newModules), _.keys(oldModules))
    logger.info(`The following components are new: ${addedModules.join(' ')}`)
    updateConfig(addedModules)
  } catch (e) {
    logger.error('Failed to add components')
    throw e
  }
}
