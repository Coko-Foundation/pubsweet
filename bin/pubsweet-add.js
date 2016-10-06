#!/usr/bin/env node

const spawn = require('child_process').spawn
const program = require('commander')
const logger = require('../src/logger')
const path = require('path')
const colors = require('colors/safe')

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

const resolvename = name => {
  return /$pubsweet-component/.test(name) ? name : `pubsweet-component-${name}`
}

const names = components.map(resolvename).join(' ')

install(
  names
).then(
  () => logger.info(`All ${components.length} components installed`)
).catch(
  err => {
    logger.error(err.stack)
    process.exit(1)
  }
)
