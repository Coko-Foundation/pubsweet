const path = require('path')
const fs = require('fs-extra')
const diff = require('lodash/difference')
const pullAll = require('lodash/pullAll')
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
  logger.info('Removing components', names)

  require('../src/load-config')(path.resolve('config'))

  const child = spawn(`yarn remove ${names}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  })

  child.on('close', resolve)
  child.on('error', reject)

  logger.info('Finished removing components', names)
})

const updateConfig = async dropcomponents => {
  logger.info(`Removing ${dropcomponents.length} components from config`)
  logger.info(`Components being removed: ${dropcomponents.join(' ')}`)

  const configFile = path.join(process.cwd(), 'config', 'components.json')
  if (!fs.pathExistsSync(configFile)) return

  let components = await fs.readJson(configFile)

  components = pullAll(components, dropcomponents)

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

    const removedModules = diff(Object.keys(oldModules), Object.keys(newModules))
    await updateConfig(removedModules)
  } catch (e) {
    logger.error('removing components failed')
    throw e
  }
}
