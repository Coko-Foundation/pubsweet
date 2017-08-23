const path = require('path')
const fs = require('fs-extra')
const union = require('lodash/union')
const diff = require('lodash/difference')
const spawn = require('child_process').spawn

const logger = require('pubsweet-logger')

// this regex matches all URL patterns and shortcuts accepted by npm
// https://regex101.com/r/LWuC1E/1
const isRepo = string => {
  return /^((git\+?[^:]*:\/\/)|(github|gitlab|bitbucket|gist))/.test(string)
}

const resolvename = name => {
  if (fs.pathExistsSync(name)) return `file:${name}`
  if (isRepo(name)) return name
  return /^pubsweet-component/.test(name) ? name : `pubsweet-component-${name}`
}

const install = names => new Promise((resolve, reject) => {
  logger.info('Adding components', names)

  require('../src/load-config')(path.resolve('config'))

  const child = spawn(`yarn add ${names}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  })

  child.on('close', resolve)
  child.on('error', reject)

  logger.info('Finished adding components', names)
})

const updateConfig = async newcomponents => {
  logger.info(`Adding ${newcomponents.length} components to config`)
  logger.info(`Components being added: ${newcomponents.join(' ')}`)

  const configFile = path.join(process.cwd(), 'config', 'components.json')
  if (!fs.pathExistsSync(configFile)) return

  logger.info(`Adding components to config`)
  let components = await fs.readJson(configFile)

  // TODO: test that this works when empty/undefined
  components = union(components, newcomponents)

  await fs.writeJson(configFile, components)

  logger.info('Finished updating config')
}

const dependencyNames = async () => {
  logger.info('Reading dependencies')

  const { dependencies } = await fs.readJson('./package.json')

  return dependencies
}

module.exports = async components => {
  try {
    const names = components.map(resolvename).join(' ')

    const oldModules = await dependencyNames()
    await install(names)
    const newModules = await dependencyNames()

    const addedModules = diff(Object.keys(newModules), Object.keys(oldModules))
    await updateConfig(addedModules)
  } catch (e) {
    logger.error('adding components failed')
    throw e
  }
}
