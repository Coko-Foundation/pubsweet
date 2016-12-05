const path = require('path')
const fs = require('fs')

var babelIncludes = [
  new RegExp(path.join(__dirname, '../node_modules/pubsweet-frontend/src')),
  new RegExp(path.join(__dirname, '../app')),
  new RegExp(path.join(__dirname, '../node_modules/pubsweet-[^/]*(?!.*/node_modules)'))
]

module.exports = babelIncludes
