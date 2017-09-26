const path = require('path')
const logger = require('@pubsweet/logger')
const fs = require('fs-extra')
const _ = require('lodash')
const spawn = require('child-process-promise').spawn
const { isRepo, resolveName, getDepsFromPackageJson } = require('./helpers/')

const remove = async names => {
  logger.info('Removing components', names)
  await spawn('yarn', ['remove'].concat(names), { stdio: 'inherit' })
  logger.info('Finished removing components', names)
})

const updateConfig = removedComponents => {
  const configFile = path.join(process.cwd(), 'config', 'components.json')
  logger.info(`Removing components from ${configFile}`)
  fs.ensureFileSync(configFile)
  const oldComponents = fs.readJsonSync(configFile, {throws:false})
  const newComponents = _.difference(oldComponents, removedComponents)
  fs.writeJsonSync(configFile, newComponents)
  logger.info('Finished updating components.json config')
}

module.exports = async components => {
  try {
    const names = components.map(resolveName)
    const oldModules = getDepsFromPackageJson()
    await remove(names)
    const newModules = getDepsFromPackageJson()
    const removedModules = _.difference(_.keys(oldModules), _.keys(newModules))
    await updateConfig(removedModules)
  } catch (e) {
    logger.error('Failed to remove components')
    throw e
  }
}
