const fs = require('fs-extra')
const path = require('path')
const Git = require('git-wrapper2-promise')
const spawn = require('child-process-promise').spawn
const logger = require('./logger')

const copyInitialApp = async () => {
  // the path to the source files
  const inputDir = path.join(__dirname, '..', 'initial-app')

  // the output path is the current directory
  const outputDir = process.cwd()

  // copy files from the input to the output directory
  await fs.copy(inputDir, outputDir, {overwrite: false})
}

const installPackages = async () => {
  await spawn('yarn', ['--ignore-optional', '--no-progress'], {
    cwd: process.cwd(),
    stdio: process.env.SILENT_INSTALL ? 'ignore' : 'inherit',
    shell: true,
    env: Object.assign({}, process.env, {NODE_ENV: 'dev'})
  })
}

const initialGitCommit = async () => {
  const git = new Git()

  // initialise the git repository
  await git.exec('init')

  // add the current directory
  await git.add('.')

  // add the .gitkeep files
  await spawn('git', [
    'add',
    '-f', // force add as they're ignored in .gitignore
    'api/db/dev/.gitkeep',
    'api/db/production/.gitkeep',
    'logs/dev/.gitkeep',
    'logs/production/.gitkeep'
  ])

  await git.commit('Initial app commit')
}

module.exports = async () => {
  try {
    await copyInitialApp()
    logger.info('Generated app structure')

    // TODO: set "name" in package.json?

    logger.info('Installing app dependencies...')
    await installPackages()
    logger.info('Finished installing app dependencies')

    await initialGitCommit()
    logger.info('git repository set up in app directory with initial commit')
  } catch (e) {
    logger.error('Initial app setup failed')
    throw e
  }
}
