var path = require('path')

var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var publicPath = 'assets/'

var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader?stage=0',
    include: path.join(__dirname, '..', 'app')
  },
  { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' },
  { test: /\.jpg$/, loader: 'file-loader' },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.scss$/,
    loader: 'css/locals?module&localIdentName=[local]%20[hash:base64:5]' +
      '&sourceMap!sass?sourceMap&outputStyle=expanded' +
      '&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))
  }
]

module.exports = [
  {
    // The configuration for the client
    name: 'browser',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: './client'
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath

    },
    devtool: 'source-map',
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['eslint']
      }],
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        'app', 'node_modules'
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.ExtractTextPlugin('styles/main.css'),
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
]
