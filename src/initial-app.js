const exec = require('child_process').exec
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
    return exec(
      'npm install',
      { cwd: process.cwd() },
      err => {
        if (err) return reject(err)
        logger.info('Dependencies installed')
        return resolve()
      }
    )
  }
)

module.exports = name => {
  fs.mkdirsSync(name)
  process.chdir(name)

  return writepkgjson(
    name
  ).then(
    () => copyapp(name)
  ).then(
    install
  ).catch(
    logger.error
  )
}
