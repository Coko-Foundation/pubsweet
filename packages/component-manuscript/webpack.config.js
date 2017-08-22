process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    library: 'WaxEditor',
    libraryTarget: 'commonjs2'
  },
  devtool: 'cheap-module-source-map',
  // externals: [nodeExternals({
  //   whitelist: [/\.(?!js$).{1,5}$/i]
  // })],
  resolve: {
    symlinks: false, // needed to prevent babel looking in other folders
    extensions: ['.js', '.jsx'], // needed because pubsweet-component-wax uses jsx
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            include: [
              path.join(__dirname, 'src'),
              /pubsweet-[^/]+\/src/,
              /xpub-[^/]+\/src/,
            ],
            loader: 'babel-loader',
            options: {
              presets: [
                // 'minify',
                ['env', { modules: false }],
                'react',
                'stage-2'
              ],
            }
          },

          // CSS modules
          {
            test: /\.local\.css$/,
            include: [
              path.join(__dirname, 'src'),
              /pubsweet-[^/]+\/src/,
              /xpub-[^/]+\/src/,
            ],
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              }
            ]
          },

          // CSS
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
            })
          },

          // SCSS
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
          },

          // other files
          {
            exclude: [/\.jsx?$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
}
