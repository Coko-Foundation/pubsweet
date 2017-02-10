var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ThemePlugin = require('pubsweet-theme-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var config = require('../config/production')

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
      path: path.join(__dirname, '..', '_build', 'assets'),
      filename: '[name]-[hash].js',
      publicPath: '/assets/'
    },
    module: {
      rules: require('./common-rules')
    },
    resolve: {
      symlinks: false,
      modules: [
        path.resolve(__dirname, '..'),
        path.join(__dirname, '..', 'node_modules'),
        'node_modules'
      ],
      alias: {
        joi: 'joi-browser'
      },
      extensions: ['.js', '.jsx', '.json', '.scss'],
      plugins: [new ThemePlugin(config['pubsweet-frontend'].theme)]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'PubSweet app',
        template: '../app/index.ejs', // Load a custom template
        inject: 'body' // Inject all scripts into the body
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.ProvidePlugin({
        'CONFIG': path.resolve(__dirname, '..', 'config', 'production.js')
      }),
      new ExtractTextPlugin('styles/main.css'),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin(),
      new CopyWebpackPlugin([
        { from: '../static' }
      ])
    ],
    node: {
      fs: 'empty',
      __dirname: true
    }
  }
]
