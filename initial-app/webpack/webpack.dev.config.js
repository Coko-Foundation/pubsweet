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
        path.join(__dirname, '..', 'node_modules'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json', '.scss']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev'),
        'CONFIG': JSON.stringify(require('./config-shim'))
      }),
    ],
    node: {
      fs: 'empty'
    }
  }
]
