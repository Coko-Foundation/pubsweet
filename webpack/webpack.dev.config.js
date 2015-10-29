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
          { test: /\.scss$|\.css$/,
            loader: 'style!css!sass'
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
  }
]
