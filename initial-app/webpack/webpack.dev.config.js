var path = require('path')
var webpack = require('webpack')

module.exports = [
  {
    // The configuration for the client
    name: 'app',
    target: 'web',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './app'
      ]
    },
    output: {
      path: path.join(__dirname, '..', 'public', 'assets'),
      filename: '[name].js',
      publicPath: '/assets/'
    },
    devtool: 'inline-source-map',
    module: {
      rules: require('./common-rules')
    },
    resolve: {
      symlinks: false,
      modules: [
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '..', 'node_modules'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json', '.scss'],
      enforceExtension: false
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('dev')
        }
      }),
      new webpack.ProvidePlugin({
        'CONFIG': path.resolve(__dirname, '..', 'config', 'dev.js')
      })
    ],
    node: {
      fs: 'empty',
      __dirname: true
    }
  }
]
