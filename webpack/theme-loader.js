var loaderUtils = require('loader-utils')
const fs = require('fs')

module.exports = function (defaultStyle) {
  this.cacheable && this.cacheable()

  var query = loaderUtils.parseQuery(this.query)
  var theme = query.theme
  var callback = this.async()

  var pathWithTheme = this.resourcePath

  if (theme !== 'default') {
    var pathWithoutFiletype = this.resourcePath.substr(0, this.resourcePath.lastIndexOf('.'))
    pathWithTheme = pathWithoutFiletype + '-' + theme + '.scss'
  }

  fs.readFile(pathWithTheme, function (err, style) {
    if (err) {
      console.log('No theme found:', pathWithTheme, 'Loading default style.')
      callback(null, defaultStyle)
    } else {
      if (theme !== 'default') {
        console.log('Theme found:', pathWithTheme)
      }
      callback(null, style)
    }
  })
}
