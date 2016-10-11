var path = require('path')
var webpack = require('webpack')
var config = require('config')
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
      new RegExp(path.join(__dirname, '../node_modules/pubsweet-frontend/src')),
      new RegExp(path.join(__dirname, '../app')),
      new RegExp(path.join(__dirname, '../node_modules/pubsweet-component-.*'))
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
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './app'
      ]
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
        exclude: [/\/node_modules/, /\/lens/, /\/substance/],
        loaders: ['eslint-loader']
      }],
      loaders: commonLoaders
    },
    sassLoader: {
      includePaths: [path.join(__dirname, '..', 'node_modules')]
    },
    resolve: {
      root: path.resolve(__dirname, '..'),
      extensions: ['', '.js', '.jsx', '.json', '.scss'],
      alias: {
        'config$': 'config.js',
        'PubSweet-routes$': config.get('pubsweet-frontend.routes'),
        'PubSweet-navigation$': config.get('pubsweet-frontend.navigation')
      }
    },
    plugins: [
      new webpack.ResolverPlugin([ThemeResolver], ['normal', 'context', 'loader']),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    node: {
      fs: 'empty'
    }
  }
]
