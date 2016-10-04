const path = require('path')
const fs = require('fs')

const config = require('config')

const theme = config.get('pubsweet-frontend.theme')

console.log('RESOLVING THEME', theme)

const moduleName = component => {
  const namepart = component
    .replace(
      /([A-Z])/g,
      l => `-${l.toLowerCase()}`
    )

  return `pubsweet-component${namepart}`
}

const componentName = module => module
  .replace('pubsweet-component-', '')
  .split('-')
  .map(w => `${w.slice(0, 1).toUpperCase()}${w.slice(1)}`)
  .join('')

// Theme Resolver
const ThemeResolver = {
  apply: function (resolver) {
    resolver.plugin('file', function (request, callback) {
      const self = this
      self.cache = self.cache || {}
      const requestJson = JSON.stringify(request)

      if (self.cache[requestJson] === true) {
        return callback()
      } else if (self.cache[requestJson] !== undefined) {
        return self.doResolve(['file'], self.cache[requestJson], callback)
      }

      const done = () => {
        self.cache[requestJson] = true
        return callback()
      }

      if (theme === 'default') return done()

      const themeModule = moduleName(theme)

      if (/\.local\.scss$/.test(request.request)) {
        var extension = '.local.scss'
        var pathWithoutFiletype = path.dirname(request.request) + '/' + path.basename(request.request, extension)
      } else if (path.extname(request.request) === '.scss') {
        extension = '.scss'
        pathWithoutFiletype = path.dirname(request.request) + '/' + path.basename(request.request, extension)
      } else {
        self.cache[requestJson] = true
        return callback()
      }

      var folders = request.path.split('/')
      var componentModule = folders.pop()

      if (!(/pubsweet-component/.test(componentModule))) return done()

      var pathWithTheme = path
        .resolve(
          request.path,
          '..',
          themeModule,
          componentName(componentModule),
          pathWithoutFiletype
        ) + extension

      var pathWithoutTheme = path
        .resolve(
          request.path,
          pathWithoutFiletype
        ) + extension

      fs.stat(pathWithoutTheme, (err, stats) => {
        if (err) return done()

        fs.stat(pathWithTheme, (err, stats) => {
          if (err) return callback()

          console.log('** Theme found **:', pathWithTheme)
          var obj = {
            path: path.dirname(pathWithTheme),
            request: request.request,
            query: request.query,
            directory: request.directory
          }

          self.cache[requestJson] = obj
          self.doResolve(['file'], obj, callback)
        })
      })
    })
  }
}

module.exports = ThemeResolver
