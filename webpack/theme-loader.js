var loaderUtils = require('loader-utils')

module.exports = function (content, map) {
  this.cacheable && this.cacheable()
  // var query = loaderUtils.parseQuery(this.query)
  console.log(this)
  var query = loaderUtils.parseQuery(this.query)
  console.log(query)
  console.log(this.request)
  // console.log(loaderUtils.stringifyRequest(this))
  this.callback(null, content, map)
  // fs.stat(theme, function (err) { //eslint-disable-line
  //   err && require('./styles/Editor.scss') || require(defaultTheme)
  // })
  // var url = loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
  //   context: query.context || this.options.context,
  //   content: content,
  //   regExp: query.regExp
  // })
  // this.emitFile(url, content)
  // return 'module.exports = __webpack_public_path__ + ' + JSON.stringify(url) + ''
}
