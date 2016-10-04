var proxy = require('express-http-proxy')
var config = require('config')

var inkProxy = proxy(config.get('pubsweet-component-ink-backend.inkEndpoint'), {
  forwardPath: function (req, res) {
      return require('url').parse(req.baseUrl).path
  }
})

module.exports = {
  backend: app => app.use('/ink', inkProxy)
}
