var path = require('path')
var webpack = require('webpack')
var HappyPack = require('happypack')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    loader: 'happypack/loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    // query: {
    //   'presets': ['react-hmre', 'es2015', 'react']
    // },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')
  },
  // {
  //   test: /\.js$|\.jsx$/,
  //   loaders: ['react-hot', 'babel-loader'],
  //   include: [
  //     path.join(__dirname, '..', 'app'),
  //     path.join(__dirname, '..', 'routes'),
  //     path.join(__dirname, '..', 'app.js')
  //   ]
  //   // exclude: [
  //   // ]
  // },
  { test: /\.png$/, loader: 'url-loader' },
  {
    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
    loader: 'url?prefix=font/&limit=10000'
  },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.css$|\.scss$/, loader: 'style-loader!raw-loader!sass-loader' }

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
    devtool: 'cheap-module-eval-source-map',
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: [/\/node_modules/, /\/lens/, /\/substance/],
        loaders: ['eslint-loader']
      }],
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.scss']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // new ExtractTextPlugin('styles.css'),
      new webpack.NoErrorsPlugin(),
      new HappyPack({
        id: 'js',
        loaders: [
          {
            path: path.resolve(__dirname, '..', 'node_modules/babel-loader/index.js'),
            query: '?presets[]=react-hmre,presets[]=es2015,presets[]=react'
          }
        ]
        // customize as needed, see Configuration below
      })
    ],
    node: {
      fs: 'empty'
    }
  }
]
