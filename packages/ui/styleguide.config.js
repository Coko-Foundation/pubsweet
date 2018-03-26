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
  title: 'PubSweet UI style guide',
  compilerConfig: {
    transforms: { dangerousTaggedTemplateString: true },
  },
}