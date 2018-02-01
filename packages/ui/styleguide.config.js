module.exports = {
  context: {
    faker: 'faker',
  },
  sections: [
    {
      content: 'docs/colors.md',
      name: 'Colors',
    },
    {
      content: 'docs/fonts.md',
      name: 'Fonts',
    },
    {
      components: 'src/atoms/*.js',
      name: 'Atoms',
    },
    {
      components: 'src/molecules/*.js',
      name: 'Molecules',
    },
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    StyleGuideRenderer: require.resolve(
      '@pubsweet/styleguide/src/components/StyleGuideRenderer',
    ),
    Wrapper: require.resolve('@pubsweet/styleguide/src/components/Wrapper'),
  },
  theme: {
    color: {
      link: '#205d86',
    },
    fontFamily: {
      base: '"Noto Sans", sans-serif',
    },
  },
  title: 'PubSweet UI style guide',
}
