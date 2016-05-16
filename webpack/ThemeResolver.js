const config = require('../config')
const path = require('path')
const fs = require('fs')

// Theme Resolver
var ThemeResolver = {
  apply: function (resolver) {
    resolver.plugin('file', function (request, callback) {
      if (config.theme !== 'default') {
        if (/\.local\.scss$/.test(request.request)) {
          var extension = '.local.scss'
          var pathWithoutFiletype = path.dirname(request.request) + '/' + path.basename(request.request, extension)
        } else if (path.extname(request.request) === '.scss') {
          extension = '.scss'
          pathWithoutFiletype = path.dirname(request.request) + '/' + path.basename(request.request, extension)
        } else if (path.extname(request.request === '')) {
          extension = '.scss'
          pathWithoutFiletype = request.request
        } else {
          return callback()
        }

        var pathWithTheme = path.resolve(request.path, pathWithoutFiletype) + '-' + config.theme + extension
        var pathWithoutTheme = path.resolve(request.path, pathWithoutFiletype) + extension

        fs.stat(pathWithoutTheme, function (err, stats) {
          if (err) {
            console.log(pathWithoutTheme, 'does not exist')
            callback()
          } else {
            console.log(pathWithTheme)
            fs.stat(pathWithTheme, function (err, stats) {
              if (err) {
                console.log('No theme found:', pathWithTheme, 'Loading default style.')
                callback()
              } else {
                console.log('Theme found:', pathWithTheme)
                var obj = {
                  path: request.path,
                  request: pathWithTheme,
                  query: request.query,
                  directory: request.directory
                }
                this.doResolve(['file'], obj, callback)
              }
            }.bind(this))
          }
        }.bind(this))
      } else {
        callback()
      }
    })
  }
}

module.exports = ThemeResolver