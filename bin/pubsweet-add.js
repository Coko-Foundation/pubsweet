#!/usr/bin/env node

const spawn = require('child_process').spawn
const program = require('commander')
const logger = require('../src/logger')
const path = require('path')
const colors = require('colors/safe')
const fs = require('fs')
const diff = require('lodash/difference')
const after = require('lodash/after')

// this regex matches all URL patterns and shortcuts accepted by npm
// https://regex101.com/r/LWuC1E/1
const isRepo = string => {
  return /^((git\+?[^:]*:\/\/)|(github|gitlab|bitbucket|gist|))/.test(string)
}

const isPath = string => {
  try {
    fs.statSync(string)
    return true
  } catch (e) {
    return false
  }
}

program
  .arguments('<components>')
  .description(`Add component(s) to an app.

  <components> - a space-separated list of one or more components.`)
  .parse(process.argv)

let components = program.args
if (!components || components.length === 0) {
  const eg = colors.bold(`pubsweet add ${colors.italic('login signup blog')}`)
  logger.error(`You must specify one or more components, e.g. ${eg}`)
  process.exit(1)
}

require('../src/load-config')(path.resolve('', './config'))

const install = names => new Promise(
  (resolve, reject) => {
    logger.info(`Installing ${components.length} components...`)
    const pkg = JSON.parse(fs.readFileSync('./package.json'))
    const oldmodules = Object.keys(pkg.dependencies)
    const child = spawn(
      `npm install --save ${names}`,
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
  (resolve, reject) => {
    logger.info(`Adding ${components.length} components to config`)
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

        configstr = `
  const path = require('path')

  module.exports = ${JSON.stringify(config, null, 2)}
  `
        fs.writeFileSync(configpath(mode), configstr)
        doresolve()
      })
    })
  }
)

const done = () => logger.info(`All ${components.length} components installed`)

const resolvename = name => {
  if (isRepo(name)) return name
  if (isPath(name)) return name
  return /$pubsweet-component/.test(name) ? name : `pubsweet-component-${name}`
}

const names = components.map(resolvename).join(' ')

install(
  names
).then(
  modules => updateconfig(modules)
).then(
  done
).catch(
  err => {
    logger.error(err.stack)
    process.exit(1)
  }
)
