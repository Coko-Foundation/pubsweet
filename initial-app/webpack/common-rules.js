const path = require('path')
const CONFIG = require('./config-shim')
const babelIncludes = require('./babel-includes')

const resolve = entry => {
  if (typeof entry === 'string') {
    return require.resolve(`babel-preset-${entry}`)
  } else {
    return [require.resolve(`babel-preset-${entry[0]}`), entry[1]]
  }
}

module.exports = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    query: {
      presets: [
        ['es2015', { 'modules': 'commonjs' }],
        'react',
        'stage-2'
      ].map(resolve),
      plugins: ['react-hot-loader/babel']
    },
    include: babelIncludes
  },
  { test: /\.png$/, loader: 'url-loader' },
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
  },
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.css$|\.scss$/,
    exclude: /\.local\.s?css$/, // Exclude local styles from global
    loader: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.join(__dirname, '..', 'node_modules')]
        }
      }
    ]
  },
  { test: /\.css$|\.scss$/,
    include: /\.local\.s?css/, // Local styles
    loader: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.join(__dirname, '..', 'node_modules')]
        }
      }
    ]
  },
  {
    test: /\.js$|\.jsx$/,
    loader: 'string-replace',
    query: {
      search: 'PUBSWEET_COMPONENTS',
      replace: '[' + CONFIG.pubsweet.components.map(component => `require('${component}')`).join(', ') + ']'
    },
    include: babelIncludes
  }
]
