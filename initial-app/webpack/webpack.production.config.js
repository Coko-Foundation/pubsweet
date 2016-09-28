var path = require('path')
var webpack = require('webpack')
var config = require('config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ThemeResolver = require('./theme-resolver')
var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var publicPath = '/assets/'

// We're including JSX components from our components package,
// but excluding its node_modules.
var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'react', 'stage-2'],
      plugins: ['react-hot-loader/babel']
    },
    include: [
      new RegExp(path.join(__dirname, '../node_modules/pubsweet-backend/src')),
      new RegExp(path.join(__dirname, '../app'))
    ]
  },
  { test: /\.png$/, loader: 'url-loader' },
  {
    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
    loader: 'url?prefix=font/&limit=10000'
  },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.css$|\.scss$/,
    exclude: /\.local\.s?css$/, // Exclude local styles from global
    loader: 'style-loader!css-loader!sass-loader'
  },
  { test: /\.css$|\.scss$/,
    include: /\.local\.s?css/, // Local styles
    loader: 'style-loader!css-loader?modules&importLoaders=1!sass-loader'
  }

]

module.exports = [
  {
    // The configuration for the client
    name: 'app',
    target: 'web',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: [
        './app'
      ]
    },
    output: {
      path: assetsPath,
      filename: '[name]-[hash].js',
      publicPath: publicPath
    },
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: [/\/node_modules/, /\/lens/, /\/substance/],
        loaders: ['eslint-loader']
      }],
      loaders: commonLoaders
    },
    resolve: {
      root: path.resolve(__dirname, '..'),
      extensions: ['', '.js', '.jsx', '.json', '.scss'],
      alias: {
        'routes$': config.get('pubsweet-frontend.routes'),
        'navigation$': config.get('pubsweet-frontend.navigation')
      }
    },
    plugins: [
      new webpack.ResolverPlugin([ThemeResolver], ['normal', 'context', 'loader']),
      new HtmlWebpackPlugin({
        title: 'PubSweet app',
        template: '../app/index.ejs', // Load a custom template
        inject: 'body' // Inject all scripts into the body
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new ExtractTextPlugin('styles/main.css'),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    node: {
      fs: 'empty'
    }
  }
]
