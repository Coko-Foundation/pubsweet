var path = require('path')
var webpack = require('webpack')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var publicPath = 'http://localhost:3001/assets/'

// We're including JSX components from our components package,
// but excluding its node_modules.
var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loaders: ['react-hot', 'babel-loader'],
    include: [
      path.join(__dirname, '..', 'app'),
      path.join(__dirname, '..', 'routes'),
      path.join(__dirname, '..', 'app.js'),
      path.join(__dirname,
        '..',
        'node_modules',
        'pubsweet-substance-components'
      )
    ],
    exclude: [
      path.join(__dirname,
        '..',
        'node_modules',
        'pubsweet-substance-components',
        'node_modules'
      )
    ]
  },
  { test: /\.png$/, loader: 'url-loader' },
  {
    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
    loader: 'url?prefix=font/&limit=10000'
  },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.json$/, loader: 'json-loader' }
]

module.exports = [
  {
    // The configuration for the client
    name: 'app',
    target: 'web',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: [ 'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server', './app' ]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath
    },
    devtool: 'inline-source-map',
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
