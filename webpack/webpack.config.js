var path = require("path");
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "..", "public", "assets");
var publicPath = "assets/";

var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: "babel-loader?stage=0",
    include: path.join(__dirname, "..",  "app")
  },
  { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
  { test: /\.html$/, loader: "html-loader" },
  { test: /\.scss$/,
    loader: 'css/locals?module&localIdentName=[local]__[hash:base64:5]' +
      '&sourceMap!sass?sourceMap&outputStyle=expanded' +
      '&includePaths[]=' + (path.resolve(__dirname, '../node_modules'))
  }
];

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./client"
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: publicPath

    },
    devtool: "source-map",
    module: {
      preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ["eslint"]
      }],
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({React: 'react'})
    ]
    //   // extract inline css from modules into separate files
    //   new ExtractTextPlugin("styles/main.css"),
    //   new webpack.optimize.UglifyJsPlugin()
    // ]
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./server",
      header: "./elements/Header"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].server.js",
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    externals: [
      {
        'alt/AltContainer': true,
        'react/addons': true
      },
      /^[a-z\-0-9]+$/
    ],
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({React: 'react'})
    ]
    // plugins: [
    //   // extract inline css from modules into separate files
    //   new ExtractTextPlugin("styles/main.css"),
    //   new webpack.optimize.UglifyJsPlugin()
    // ]
  }
];
