process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const path = require('path')
const config = require('config')
const fs = require('fs-extra')

module.exports = dir => {
  // can't use node-config in webpack so save whitelisted client config into the build and alias it below
  const outputPath = path.resolve(__dirname, '_build', 'config')
  fs.ensureDirSync(outputPath)
  const clientConfigPath = path.join(outputPath, 'client-config.json')
  fs.writeJsonSync(clientConfigPath, config, { spaces: 2 })

  const include = [
    path.join(dir, 'src'),
    path.join(dir, '..', 'packages', 'components'),
    path.join(dir, '..', 'packages', 'ui', 'src'),
    /pubsweet-[^/]+\/src/,
    /xpub-[^/]+\/src/,
    /wax-[^/]+\/src/,
    /@pubsweet\/[^/]+\/src/,
    /docs\/src/,
    /docs\/vendor/,
    /ui\/src/,
    /packages\/client\/src/,
    /@elifesciences\/[^/]+\/src/,
  ]

  return {
    devtool: 'cheap-module-source-map',
    entry: './src/index.js',
    module: {
      rules: [
        {
          oneOf: [
            // // Todo: revisit https://github.com/apollographql/react-apollo/issues/1737
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto',
            },
            // ES6 modules
            {
              test: /\.jsx?$/,
              include,
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
              },
            },
            // CSS modules
            {
              test: /\.local\.css$/,
              include,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    // sourceMap: true,
                    localIdentName: '[name]_[local]-[hash:base64:8]',
                  },
                },
              ],
            },

            // SCSS modules
            {
              test: /\.local\.scss$/,
              include,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    importLoaders: 1,
                    // sourceMap: true,
                    localIdentName: '[name]_[local]-[hash:base64:8]',
                  },
                },
                'sass-loader',
              ],
            },

            // global CSS
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },

            // global SCSS
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                'css-loader',
                // {
                //   loader: 'css-loader',
                //   options: {
                //     importLoaders: 1,
                //   }
                // },
                'sass-loader',
              ],
            },

            // Files
            {
              exclude: [/\.jsx?$/, /\.html$/, /\.json$/],
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: 'index.js',
      path: path.join(dir, 'dist'),
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/./, __dirname, {
        [config.authsome.mode]: config.authsome.mode,
      }),
    ],
    resolve: {
      alias: {
        joi: 'joi-browser',
        config: clientConfigPath,
      },
    },
    watch: true,
  }
}
