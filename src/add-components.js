const spawn = require('child_process').spawn
const logger = require('../src/logger')
const path = require('path')
const fs = require('fs')
const diff = require('lodash/difference')
const after = require('lodash/after')
const logthrow = require('./error-log-throw')

// this regex matches all URL patterns and shortcuts accepted by npm
// https://regex101.com/r/LWuC1E/1
const reporegex = /^((git\+?[^:]*:\/\/)|(github|gitlab|bitbucket|gist))/
const isRepo = string => {
  const is = reporegex.test(string)
  return is
}

const isPath = string => {
  try {
    fs.statSync(string)
    return true
  } catch (e) {
    return false
  }
}

const resolvename = name => {
  if (isPath(name)) return `file:${name}`
  if (isRepo(name)) return name
  return /$pubsweet-component/.test(name) ? name : `pubsweet-component-${name}`
}

const resolve = components => new Promise(
  resolve => resolve(components.map(resolvename).join(' '))
)

const install = names => new Promise(
  (resolve, reject) => {
    require('../src/load-config')(path.resolve('', './config'))

    const pkg = JSON.parse(fs.readFileSync('./package.json'))
    const oldmodules = Object.keys(pkg.dependencies)
    const child = spawn(
      `yarn add ${names}`,
      { cwd: process.cwd(), stdio: 'inherit', shell: true }
    )

    child.on('error', reject)

    child.on('close', () => {
      const newpkg = JSON.parse(fs.readFileSync('./package.json'))
      const newmodules = Object.keys(newpkg.dependencies)
      const diffmodules = diff(newmodules, oldmodules)
      resolve(diffmodules)
    })
  }
)

const configpath = mode => path.join(process.cwd(), 'config', `${mode}.js`)

const updateconfig = modules => new Promise(
  resolve => {
    logger.info(`Adding ${modules.length} components to config`)
    logger.info(`Components being added: ${modules.join(' ')}`)
    const deployments = ['dev', 'production']

    const doresolve = after(2, resolve)

    deployments.forEach(mode => {
      const configfile = configpath(mode)

      fs.stat(configfile, err => {
        if (err) return doresolve()
        logger.info(`Adding to ${mode} config`)
        const config = require(configfile)

        const old = config.pubsweet.components || []
        config.pubsweet.components = old.concat(modules)

        const configstr = `
  const path = require('path')

  module.exports = ${JSON.stringify(config, null, 2)}
  `
        fs.writeFileSync(configpath(mode), configstr)
        doresolve()
      })
    })
  }
)

module.exports = components => resolve(
  components
).then(
  install
).then(
  updateconfig
).catch(
  logthrow('database setup failed')
)
