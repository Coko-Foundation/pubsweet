const spawn = require('child_process').spawn
const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')

const gitlab = repo => `git+https://gitlab.coko.foundation/${repo}.git`

const getpkgjson = name => {
  return JSON.stringify({
    name: name,
    description: 'A new pubsweet app',
    dependencies: {
      'pubsweet-backend': gitlab('pubsweet/pubsweet-backend'),
      'pubsweet-frontend': gitlab('pubsweet/pubsweet-frontend')
    }
  }, null, 2)
}

const writepkgjson = name => new Promise(
  (resolve, reject) => fs.writeFile(
    'package.json',
    getpkgjson(name),
    err => {
      if (err) return reject(err)
      logger.info('Wrote package.json')
      return resolve()
    }
  )
)

const copyapp = name => new Promise(
  (resolve, reject) => fs.copy(
    path.join(__dirname, '..', 'initial-app'),
    process.cwd(),
    err => {
      if (err) return reject(err)
      logger.info('Generated app structure')
      return resolve()
    }
  )
)

const install = () => new Promise(
  (resolve, reject) => {
    logger.info('Installing app dependencies...')
    const child = spawn(
      'npm install',
      { cwd: process.cwd(), stdio: 'inherit', shell: true }
    )
    child.on('error', reject)
    child.on('close', resolve)
  }
)

module.exports = name => {
  return writepkgjson(
    name
  ).then(
    () => copyapp(name)
  ).then(
    require('./generate-config')
  ).then(
    install
  ).catch(
    logger.error
  )
}
