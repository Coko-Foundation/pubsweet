const fs = require('fs-extra')

// this regex matches all URL patterns and shortcuts accepted by npm
// https://regex101.com/r/LWuC1E/1
const isRepo = string => {
  return /^((git\+?[^:]*:\/\/)|(github|gitlab|bitbucket|gist))/.test(string)
}

const resolveName = name => {
  if (fs.pathExistsSync(name)) return `file:${name}`
  if (isRepo(name)) return name
  return /^pubsweet-component/.test(name) ? name : `pubsweet-component-${name}`
}

const getDepsFromPackageJson = () => {
  return fs.readJsonSync(path.join(process.cwd(), 'package.json')).dependencies
}

module.exports = {
  isRepo,
  resolveName,
  getDepsFromPackageJson
}
