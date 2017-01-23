const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')
const Git = require('git-wrapper2-promise')
const spawn = require('child-process-promise').spawn

const gitlab = repo => `git+https://gitlab.coko.foundation/${repo}.git`

const getpkgjson = name => {
  return JSON.stringify({
    name: name,
    description: 'A new pubsweet app',
    dependencies: {
      'pubsweet-backend': '^0.6.0',
      'pubsweet-frontend': '^0.6.0',
      'pubsweet-component-blog': '^0.1.0',
      'pubsweet-component-login': '^0.2.1',
      'pubsweet-component-posts-manager': '^0.1.0',
      'pubsweet-component-manage': '^0.1.0',
      'pubsweet-component-science-reader': '^0.1.0',
      'pubsweet-component-science-writer': '^0.1.0',
      'pubsweet-component-signup': '^0.1.0',
      'pubsweet-component-teams-manager': '^0.1.0',
      'pubsweet-component-users-manager': '^0.1.0',
      'pubsweet-component-pepper-theme': '^0.0.2',
      'pubsweet-theme-plugin': '^0.0.1',
      'bootstrap-sass': '^3.3.7',
      'babel-core': '^6.14.0',
      'babel-loader': '^6.2.5',
      'babel-preset-es2015': '^6.14.0',
      'babel-preset-es2015-native-modules': '^6.9.4',
      'babel-preset-react': '^6.11.1',
      'babel-preset-stage-2': '^6.13.0',
      'css-loader': '^0.25.0',
      'copy-webpack-plugin': '^4.0.1',
      'file-loader': '^0.9.0',
      'json-loader': '^0.5.4',
      'sass-loader': '^4.0.2',
      'script-loader': '^0.7.0',
      'string-replace-loader': '^1.0.5',
      'url-loader': '^0.5.7',
      'extract-text-webpack-plugin': '^2.0.0-beta.4',
      'react-hot-loader': '^3.0.0-beta.5',
      'style-loader': '^0.13.1',
      'webpack': '^2.1.0-beta.25',
      'webpack-dev-middleware': '^1.8.4',
      'webpack-hot-middleware': '^2.13.0',
      'autobind-decorator': '^1.3.4',
      'babel-plugin-transform-decorators-legacy': '^1.3.4',
      'html-webpack-plugin': '^2.24.0',
      'eslint': '^3.6.0',
      'eslint-config-standard': '^6.2.0',
      'eslint-config-standard-react': '^4.2.0',
      'eslint-loader': '^1.6.0',
      'eslint-plugin-promise': '^3.3.0',
      'eslint-plugin-react': '^6.4.1',
      'eslint-plugin-standard': '^2.0.0',
      'authsome': '^0.0.4',
      'pouchdb-core': '6.0.7'
    },
    repository: 'put your repo here',
    license: 'UNLICENSED'
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

const install = () => {
  logger.info('Installing app dependencies...')
  return spawn(
    'npm install',
    { cwd: process.cwd(), stdio: 'inherit', shell: true }
  )
}

const gitsetup = () => {
  const git = new Git()

  return git.exec('init').then(
    () => git.add('.')
  ).then(
    () => spawn('git', [
      'add',
      '-f',
     'api/db/dev/.gitkeep',
     'api/db/production/.gitkeep',
     'logs/dev/.gitkeep',
     'logs/production/.gitkeep'
    ])
  ).then(
    () => git.commit('Initial app commit')
  ).then(
    () => new Promise(done => {
      logger.info('git repository set up in app directory with initial commit')
      done()
    })
  ).catch(childProcess => logger.error('git setup failed:', childProcess.stderr))
}

module.exports = name => {
  return writepkgjson(
    name
  ).then(
    () => copyapp(name)
  ).then(
    install
  ).then(
    gitsetup
  ).catch(
    err => {
      logger.error(err.stack)
      process.exit(1)
    }
  )
}
