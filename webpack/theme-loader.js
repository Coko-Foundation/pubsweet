var loaderUtils = require('loader-utils')
const fs = require('fs')

module.exports = function (defaultTheme) {
  this.cacheable && this.cacheable()

  var query = loaderUtils.parseQuery(this.query)
  var callback = this.async()
  console.log(query)
  console.log(this.resourcePath)

  var pathWithTheme = this.resourcePath

  if (query.theme !== 'default') {
    var pathWithoutFiletype = this.resourcePath.substr(0, this.resourcePath.lastIndexOf('.'))
    pathWithTheme = pathWithoutFiletype + '-' + query.theme + '.scss'
  }

  fs.readFile(pathWithTheme, function (err, theme) {
    if (err) {
      console.log('No theme found:', pathWithTheme, 'Loading default style.')
      callback(null, defaultTheme)
    } else {
      console.log('Theme found:', pathWithTheme)
      callback(null, theme)
    }
  })
}
