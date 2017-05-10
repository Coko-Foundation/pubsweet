const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')
const Git = require('git-wrapper2-promise')
const spawn = require('child-process-promise').spawn
const logthrow = require('./error-log-throw')

const getpkgjson = name => {
  return JSON.stringify({
    name: name,
    description: 'A new pubsweet app',
    dependencies: {
      'joi': '^10.4.1',
      'pubsweet-server': '^0.9.2',
      'pubsweet-client': '^0.9.1',
      'pubsweet-component-blog': '^0.1.5',
      'pubsweet-component-login': '^0.2.3',
      'pubsweet-component-posts-manager': '^0.1.3',
      'pubsweet-component-manage': '^0.1.5',
      'pubsweet-component-signup': '^0.1.3',
      'pubsweet-component-teams-manager': '^0.1.3',
      'pubsweet-component-users-manager': '^0.1.3',
      'pubsweet-component-pepper-theme': '^0.0.3',
      'pubsweet-theme-plugin': '^0.0.1',
      'react': '^15.4.2',
      'react-dom': '^15.4.2',
      'react-router': '^2.6.1',
      'react-router-bootstrap': '^0.23.1',
      'redux': '^3.6.0'
    },
    devDependencies: {
      'app-module-path': '^2.2.0',
      'autobind-decorator': '^1.3.4',
      'babel-core': '^6.14.0',
      'babel-loader': '^7.0.0',
      'babel-plugin-transform-decorators-legacy': '^1.3.4',
      'babel-preset-babili': '0.0.12',
      'babel-preset-es2015': '^6.14.0',
      'babel-preset-es2015-native-modules': '^6.9.4',
      'babel-preset-react': '^6.11.1',
      'babel-preset-stage-2': '^6.13.0',
      'babili-webpack-plugin': '^0.0.11',
      'bootstrap-sass': '^3.3.7',
      'compression-webpack-plugin': '^0.3.1',
      'copy-webpack-plugin': '^4.0.1',
      'css-loader': '^0.28.1',
      'eslint': '^3.6.0',
      'eslint-config-standard': '^6.2.0',
      'eslint-config-standard-react': '^4.2.0',
      'eslint-loader': '^1.6.0',
      'eslint-plugin-promise': '^3.3.0',
      'eslint-plugin-react': '^6.4.1',
      'eslint-plugin-standard': '^2.0.0',
      'extract-text-webpack-plugin': '^2.0.0-beta.4',
      'file-loader': '^0.11.1',
      'html-webpack-plugin': '^2.24.0',
      'joi-browser': '^10.0.6',
      'json-loader': '^0.5.4',
      'node-sass': '^4.5.2',
      'pouchdb-adapter-memory': '^6.1.1',
      'react-hot-loader': '^3.0.0-beta.6',
      'sass-loader': '^6.0.3',
      'script-loader': '^0.7.0',
      'string-replace-loader': '^1.2.0',
      'style-loader': '^0.17.0',
      'url-loader': '^0.5.8',
      'webpack': '^2.4.1',
      'webpack-dev-middleware': '^1.10.2',
      'webpack-hot-middleware': '^2.18.0'
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

const copyapp = () => new Promise(
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
  const env = Object.create(process.env)
  env.NODE_ENV = 'dev'

  return spawn(
    'yarn',
    ['--ignore-optional', '--no-progress'],
    {
      cwd: process.cwd(),
      stdio: process.env.SILENT_INSTALL ? 'ignore' : 'inherit',
      shell: true,
      env: env
    }
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
    () => new Promise(resolve => {
      logger.info('git repository set up in app directory with initial commit')
      resolve()
    })
  )
}

module.exports = name => writepkgjson(
  name
).then(
  () => copyapp(name)
).then(
  install
).then(
  gitsetup
).catch(
  logthrow('initial app setup failed')
)
