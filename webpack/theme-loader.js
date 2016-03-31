var loaderUtils = require('loader-utils')
const fs = require('fs')

module.exports = function (defaultTheme) {
  // this.cacheable && this.cacheable()
  // var query = loaderUtils.parseQuery(this.query)
  // console.log(this)
  debugger
  var query = loaderUtils.parseQuery(this.query)
  var callback = this.async()
  console.log(query)
  console.log('THEME', query.theme)
  console.log('WHAT', query.what)
  console.log(this.resourcePath)
  // console.log(loaderUtils.stringifyRequest(this))

  var pathWithoutFiletype = this.resourcePath.substr(0, this.resourcePath.lastIndexOf('.'))
  var pathWithTheme = pathWithoutFiletype + '-' + query.theme + '.scss'

  fs.readFile(pathWithTheme, function (err, theme) {
    if (err) {
      console.log('No theme found:', pathWithTheme)
      callback(null, defaultTheme)
    } else {
      console.log('Theme found:', pathWithTheme)
      callback(theme)
    }
  })
}
