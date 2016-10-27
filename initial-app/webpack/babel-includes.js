const path = require('path')
const fs = require('fs')

var babelIncludes = [
  new RegExp(path.join(__dirname, '../node_modules/pubsweet-frontend/src')),
  new RegExp(path.join(__dirname, '../app')),
  new RegExp(path.join(__dirname, '../node_modules/pubsweet-.*'))
]

let componentsDir = path.resolve(__dirname, '..', 'node_modules')
let componentsRegex = new RegExp(path.join(__dirname, '../node_modules/pubsweet-.*'))

let symlinkedComponents = fs.readdirSync(componentsDir).map(file => {
  return path.resolve(componentsDir, file)
}).filter(file => {
  return fs.lstatSync(file).isSymbolicLink() && componentsRegex.test(file)
}).map(function (componentSymlink) {
  return new RegExp(path.join(fs.realpathSync(componentSymlink), '(?!node_modules)'))
})

module.exports = babelIncludes.concat(symlinkedComponents)
