const path = require('path')
const logger = require('@pubsweet/logger')
const fs = require('fs-extra')
const _ = require('lodash')
const spawnSync = require('child_process').spawnSync
const { resolveName, getDepsFromPackageJson } = require('./helpers/')

const remove = names => {
  logger.info('Removing components:', names)
  spawnSync('yarn', ['remove'].concat(names), { stdio: 'inherit' })
  logger.info('Finished removing components')
}

const updateConfig = removedComponents => {
  const configFile = path.join(process.cwd(), 'config', 'components.json')
  logger.info(`Removing components from ${configFile}`)
  fs.ensureFileSync(configFile)
  const oldComponents = fs.readJsonSync(configFile, { throws: false })
  const newComponents = _.difference(oldComponents, removedComponents)
  fs.writeJsonSync(configFile, newComponents, { spaces: '\t' })
  logger.info('Finished updating components.json config')
}

module.exports = async components => {
  try {
    const names = components.map(resolveName)
    const oldModules = getDepsFromPackageJson()
    remove(names)
    const newModules = getDepsFromPackageJson()
    const removedModules = _.difference(_.keys(oldModules), _.keys(newModules))
    updateConfig(removedModules)
  } catch (e) {
    logger.error('Failed to remove components')
    throw e
  }
}
