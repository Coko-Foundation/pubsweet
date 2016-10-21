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
      'pubsweet-frontend': gitlab('pubsweet/pubsweet-frontend'),
      'pubsweet-component-blog': '^0.0.7',
      'pubsweet-component-login': '^0.0.7',
      'pubsweet-component-manage': '^0.0.7',
      'pubsweet-component-posts-manager': '^0.0.4',
      'pubsweet-component-science-reader': '^0.0.4',
      'pubsweet-component-science-writer': '^0.0.5',
      'pubsweet-component-signup': '^0.0.6',
      'pubsweet-component-teams-manager': '^0.0.5',
      'pubsweet-component-users-manager': '^0.0.2',
      'pubsweet-component-pepper-theme': '^0.0.2',
      'bootstrap-sass': '^3.3.7',
      'babel-core': '^6.14.0',
      'babel-loader': '^6.2.5',
      'babel-preset-es2015': '^6.14.0',
      'babel-preset-react': '^6.11.1',
      'babel-preset-stage-2': '^6.13.0',
      'config': '^1.21.0',
      'css-loader': '^0.25.0',
      'file-loader': '^0.9.0',
      'json-loader': '^0.5.4',
      'sass-loader': '^4.0.2',
      'script-loader': '^0.7.0',
      'string-replace-loader': '^1.0.5',
      'url-loader': '^0.5.7',
      'extract-text-webpack-plugin': '^1.0.1',
      'react-hot-loader': '^3.0.0-beta.5',
      'style-loader': '^0.13.1',
      'webpack': '^1.13.2',
      'html-webpack-plugin': '^2.12.0',
      'eslint': '^3.6.0',
      'eslint-config-standard': '^6.2.0',
      'eslint-config-standard-react': '^4.2.0',
      'eslint-loader': '^1.6.0',
      'eslint-plugin-promise': '^2.0.1',
      'eslint-plugin-react': '^6.4.1',
      'eslint-plugin-standard': '^2.0.0'
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
    install
  ).catch(
    err => {
      logger.error(err.stack)
      process.exit(1)
    }
  )
}
