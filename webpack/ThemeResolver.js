const config = require('../config')
const path = require('path')
const fs = require('fs')

// Theme Resolver
var ThemeResolver = {
  apply: function (resolver) {
    resolver.plugin('file', function (request, callback) {
      this.cache = this.cache || {}
      const requestJson = JSON.stringify(request)

      if (this.cache[requestJson] === true) {
        return callback()
      } else if (this.cache[requestJson] !== undefined) {
        return this.doResolve(['file'], this.cache[requestJson], callback)
      }

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
          this.cache[requestJson] = true
          return callback()
        }

        var pathWithTheme = path.resolve(request.path, pathWithoutFiletype) + '-' + config.theme + extension
        var pathWithoutTheme = path.resolve(request.path, pathWithoutFiletype) + extension

        fs.stat(pathWithoutTheme, function (err, stats) {
          if (err) {
            this.cache[requestJson] = true
            callback()
          } else {
            fs.stat(pathWithTheme, function (err, stats) {
              if (err) {
                callback()
              } else {
                console.log('Theme found:', pathWithTheme)
                var obj = {
                  path: request.path,
                  request: pathWithTheme,
                  query: request.query,
                  directory: request.directory
                }
                this.cache[requestJson] = obj
                this.doResolve(['file'], obj, callback)
              }
            }.bind(this))
          }
        }.bind(this))
      } else {
        this.cache[requestJson] = true
        callback()
      }
    })
  }
}

module.exports = ThemeResolver