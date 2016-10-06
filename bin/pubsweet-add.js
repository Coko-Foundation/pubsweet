#!/usr/bin/env node

const spawn = require('child_process').spawn
const program = require('commander')
const logger = require('../src/logger')
const path = require('path')
const colors = require('colors/safe')
const fs = require('fs')

program.arguments('<components>')
program.parse(process.argv)

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
    const child = spawn(
      `npm install --save ${names}`,
      { cwd: process.cwd(), stdio: 'inherit', shell: true }
    )
    child.on('error', reject)
    child.on('close', resolve)
  }
)

const configpath = mode => path.join(process.cwd(), 'config', `${mode}.js`)

const updateconfig = names => new Promise(
  (resolve, reject) => {
    logger.info(`Adding ${components.length} components to config`)
    const deployments = ['dev', 'production']

    deployments.forEach(mode => {
      const config = require(configpath(mode))

      const old = config.pubsweet.components || []
      config.pubsweet.components = old.concat(names)

      configstr = `
const path = require('path')

module.exports = ${JSON.stringify(config, null, 2)}
`
      fs.writeFileSync(configpath(mode), configstr)
    })

    resolve()
  }
)

const done = () => logger.info(`All ${components.length} components installed`)

const resolvename = name => {
  return /$pubsweet-component/.test(name) ? name : `pubsweet-component-${name}`
}

const names = components.map(resolvename).join(' ')

install(
  names
).then(
  updateconfig(names)
).then(
  done
).catch(
  err => {
    logger.error(err.stack)
    process.exit(1)
  }
)
