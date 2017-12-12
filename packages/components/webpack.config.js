const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!pubsweet-)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        exclude: /\.local\.s?css$/,
        loader: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.local\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        loader: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'font',
              limit: 1000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      joi: 'joi-browser',
      config: path.join(__dirname, 'styleguidist', 'config.json')
    },
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  plugins: [
    new webpack.DefinePlugin({
      PUBSWEET_COMPONENTS: JSON.stringify([])
    })
  ]
}
