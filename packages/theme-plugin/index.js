const path = require('path')

const moduleName = component => {
  const namepart = component.replace(/([A-Z])/g, l => `-${l.toLowerCase()}`)

  return `pubsweet-component${namepart}`
}

function ThemePlugin(theme) {
  this.theme = theme || 'default'
}

const componentName = module =>
  module
    .replace('pubsweet-component-', '')
    .split('-')
    .map(w => `${w.slice(0, 1).toUpperCase()}${w.slice(1)}`)
    .join('')

ThemePlugin.prototype.apply = function(resolver) {
  const theme = this.theme
  resolver.plugin('resolve', function(request, callback) {
    const fs = resolver.fileSystem

    const self = this
    self.cache = {}

    const requestJson = JSON.stringify({
      path: request.path,
      request: request.request,
    })

    const done = () => {
      self.cache[requestJson] = true
      return callback()
    }

    if (self.cache[requestJson] === true) {
      return callback()
    } else if (self.cache[requestJson] !== undefined) {
      return self.doResolve(
        'resolve',
        self.cache[requestJson],
        `using path: ${pathWithTheme}`,
        callback,
      )
    }

    if (theme === 'default') return done()

    const themeModule = moduleName(theme)

    if (/\.local\.scss$/.test(request.request)) {
      var extension = '.local.scss'
      var pathWithoutFiletype = `${path.dirname(
        request.request,
      )}/${path.basename(request.request, extension)}`
    } else if (request.request && path.extname(request.request) === '.scss') {
      extension = '.scss'
      pathWithoutFiletype = `${path.dirname(request.request)}/${path.basename(
        request.request,
        extension,
      )}`
    } else {
      self.cache[requestJson] = true
      return callback()
    }

    const folders = request.path.split('/')
    const componentModule = folders.pop()

    if (!/pubsweet-component/.test(componentModule)) return done()

    var pathWithTheme =
      path.resolve(
        request.path,
        '..',
        themeModule,
        componentName(componentModule),
        pathWithoutFiletype,
      ) + extension

    const pathWithoutTheme =
      path.resolve(request.path, pathWithoutFiletype) + extension

    fs.stat(pathWithoutTheme, (err, stats) => {
      if (err) return done()

      fs.stat(pathWithTheme, (err, stats) => {
        if (err) return callback()

        const obj = {
          path: path.dirname(pathWithTheme),
          request: request.request,
          query: request.query,
          directory: request.directory,
        }

        self.cache[requestJson] = obj
        self.doResolve('resolve', obj, `using path: ${pathWithTheme}`, callback)
      })
    })
  })
}

module.exports = ThemePlugin
