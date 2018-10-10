const path = require('path')
const fs = require('fs')
const config = require('config')

const resolveRelative = m => require.resolve(m, { paths: [process.cwd()] })
const requireRelative = m => require(resolveRelative(m))

module.exports = () => {
  const migrationsPaths = []

  // load migrations from pubsweet-server
  migrationsPaths.push(
    path.resolve(
      path.dirname(resolveRelative('pubsweet-server')),
      '..',
      'migrations',
    ),
  )

  // load migrations from app
  if (config.has('dbManager.migrationsPath')) {
    migrationsPaths.push(path.resolve(config.get('dbManager.migrationsPath')))
  }

  function getPathsRecursively(componentName) {
    const component = requireRelative(componentName)
    const migrationsPath = path.resolve(
      path.dirname(resolveRelative(componentName)),
      'migrations',
    )

    // Add /migrations folder for components by convention
    if (fs.existsSync(migrationsPath)) {
      migrationsPaths.push(migrationsPath)
    }

    if (component.extending) {
      getPathsRecursively(component.extending)
    }
  }

  // load migrations from components
  if (config.has('pubsweet.components')) {
    config.get('pubsweet.components').forEach(componentName => {
      getPathsRecursively(componentName)
    })
  }
  // TODO: remove, release gone wrong.
  return migrationsPaths
}
