var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var publicPath = '/assets/'

// We're including JSX components from our components package,
// but excluding its node_modules.
var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loaders: ['react-hot', 'babel-loader?stage=0'],
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
  // { test: /\.(jpg|woff|woff2|eot|ttf|svg)$/, loader: 'file-loader' },
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
      app: [ './app' ]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath
    },
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new ExtractTextPlugin('styles/main.css'),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    node: {
      fs: 'empty'
    }
  }
]
