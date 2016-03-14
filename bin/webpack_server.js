/*
 Modified from:
 http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
*/
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var webpackConfig = require('../webpack/webpack.dev.config.js')

module.exports = function () {
  var server = new WebpackDevServer(webpack(webpackConfig), {
    // Tell webpack to serve our bundled application from the build path. When proxying:
    // http://localhost:3000/assets -> http://localhost:3001/assets
    publicPath: '/assets/',
    hot: true,

    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    },
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true
  })

  server.listen(3001, 'localhost', function () {
    console.log('Bundling project, please wait...')
  })
}
