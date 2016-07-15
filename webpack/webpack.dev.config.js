var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var ThemeResolver = require('./ThemeResolver')
var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var publicPath = '/assets/'

// We're including JSX components from our components package,
// but excluding its node_modules.
var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      'presets': ['react-hmre', 'es2015', 'react'],
      'cacheDirectory': true
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')
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
        './app',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
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
    resolve: {
      root: path.resolve(__dirname, '..'),
      extensions: ['', '.js', '.jsx', '.json', '.scss'],
      alias: {
        'routes$': config.routes,
        'navigation$': config.navigation
      }
    },
    plugins: [
      new webpack.ResolverPlugin([ThemeResolver], ['normal', 'context', 'loader']),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev')
      }),
      new webpack.HotModuleReplacementPlugin(),
      // new ExtractTextPlugin('styles.css'),
      new webpack.NoErrorsPlugin()
    ],
    node: {
      fs: 'empty'
    }
  }
]
