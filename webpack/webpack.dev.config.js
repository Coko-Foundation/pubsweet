var path = require('path')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')

var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var publicPath = 'http://localhost:3001/assets/'

var WEBPACK_HOST = 'localhost'
var WEBPACK_PORT = 3001

var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loaders: ['react-hot', 'babel-loader?stage=0'],
    include: [
      path.join(__dirname, '..', 'app'),
      path.join(__dirname, '..', 'routes'),
      path.join(__dirname, '..', 'app.js')
    ]
  },
  { test: /\.png$/, loader: 'url-loader' },
  {
    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
    loader: 'url?prefix=font/&limit=10000'
  },
  // { test: /\.(jpg|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader' },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.json$/, loader: 'json-loader' }
]

module.exports = [
  {
    // The configuration for the client
    name: 'browser',
    target: 'web',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: ['webpack-dev-server/client?http://' + WEBPACK_HOST + ':' + WEBPACK_PORT,
       'webpack/hot/dev-server',
        './index' ]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }],
      loaders: commonLoaders.concat([
          { test: /\.scss$/,
            loader: 'style!css!sass?includePaths[]=' +
              path.resolve(__dirname, '../node_modules/lens-writer/app/assets/fonts/')
          }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.scss']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    node: {
      fs: 'empty'
    }
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: './server',
      header: './elements/Header'
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].server.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    devtool: 'eval-source-map',
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['eslint-loader']
      }],
      loaders: commonLoaders.concat([
          { test: /\.scss$/,
            loader: 'css/locals?module&localIdentName=[local]__[hash:base64:5]' +
              '&sourceMap!sass?sourceMap&outputStyle=expanded' +
              '&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))
          }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.scss']
    }
  }
]
