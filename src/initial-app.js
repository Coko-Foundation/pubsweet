const fs = require('fs-extra')
const path = require('path')
const Git = require('git-wrapper2-promise')
const spawn = require('child-process-promise').spawn
const logger = require('@pubsweet/logger')

const copyInitialApp = async () => {
  logger.info('Generating app structure')

  // the path to the source files
  const inputDir = path.join(__dirname, '..', 'initial-app')

  // the output path is the current directory
  const outputDir = process.cwd()

  // copy files from the input to the output directory
  await fs.copy(inputDir, outputDir, {overwrite: false})

  // rename files with protected names
  await renameProtectedFiles(outputDir, [
    '.gitignore',
    'package.json'
  ])

  logger.info('Finished generating app structure')
}

// some files get special treatment by npm,
// so their filenames have been prefixed with an underscore
const renameProtectedFiles = async (outputDir, files) => {
  return Promise.all(files.map(file => {
    return fs.rename(
      path.join(outputDir, '_' + file),
      path.join(outputDir, file)
    )
  }))
}

const installPackages = async () => {
  logger.info('Installing packages')

  await spawn('yarn', ['--ignore-optional', '--no-progress'], {
    cwd: process.cwd(),
    stdio: process.env.SILENT_INSTALL ? 'ignore' : 'inherit',
    shell: true,
    env: Object.assign({}, process.env, {NODE_ENV: 'dev'})
  })

  logger.info('Finished installing packages')
}

const initialGitCommit = async () => {
  logger.info('Creating initial git commit')

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
    'api/db/production/.gitkeep'
  ])

  await git.commit('Initial app commit')

  logger.info('git repository set up in app directory with initial commit')
}

module.exports = async () => {
  logger.info('Generating initial app')

  try {
    await copyInitialApp()
    await installPackages()
    await initialGitCommit()
  } catch (e) {
    logger.error('Initial app setup failed')
    throw e
  }

  logger.info('Finished generating initial app')
}
