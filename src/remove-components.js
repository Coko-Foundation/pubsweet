const path = require('path')
const fs = require('fs-extra')
const diff = require('lodash/difference')
const pullAll = require('lodash/pullAll')
const spawn = require('child_process').spawn

const logger = require('../src/logger')

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

  require('../src/load-config')(path.resolve('', './config'))

  const child = spawn(`yarn remove ${names}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true
  })

  child.on('close', resolve)
  child.on('error', reject)

  logger.info('Finished removing components', names)
})

const updateConfig = async modules => {
  logger.info(`Removing ${modules.length} components from config`)
  logger.info(`Components being removed: ${modules.join(' ')}`)

  const configFile = path.join(process.cwd(), 'config', `shared.js`)
  if (!fs.pathExistsSync(configFile)) return

  const config = require(configFile)

  // TODO: test that this works when empty/undefined
  config.pubsweet.components = pullAll(config.pubsweet.components, modules)

  const output = [
    `const path = require('path')`,
    `module.exports = ${JSON.stringify(config, null, 2)}`
  ].join('\n\n')

  await fs.writeFile(configFile, output)

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
