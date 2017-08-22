const styleguideComponents = require('xpub-styleguide')

module.exports = {
  title: 'xpub-ui style guide',
  styleguideComponents,
  context: {
    faker: 'faker',
  },
  components: './src/*.js',
  skipComponentsWithoutExample: true,
  webpackConfig: require('./webpack.config.js'),
  theme: {
    fontFamily: {
      base: '"Fira Sans", sans-serif'
    },
    color: {
      link: 'cornflowerblue'
    }
  },
  sections: [
    {
      name: 'Atoms',
      components: 'src/atoms/*.js'
    },
    {
      name: 'Molecules',
      components: 'src/molecules/*.js'
    }
  ]
}
