var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
      path: path.join(__dirname, '..', 'public', 'assets'),
      filename: '[name]-[hash].js',
      publicPath: '/assets/'
    },
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: [/\/node_modules/, /\/lens/, /\/substance/],
        loaders: ['eslint-loader']
      }],
      rules: require('./common-rules')
    },
    resolve: {
      modules: [path.resolve(__dirname, '..', 'node_modules')],
      extensions: ['.js', '.jsx', '.json', '.scss']
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'PubSweet app',
        template: '../app/index.ejs', // Load a custom template
        inject: 'body' // Inject all scripts into the body
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'CONFIG': JSON.stringify(require('./config-shim'))
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
