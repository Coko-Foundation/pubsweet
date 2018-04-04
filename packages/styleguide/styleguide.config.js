module.exports = {
  context: {
    faker: 'faker',
  },
  sections: [
    {
      name: 'Tokens',
      sections: [
        {
          content: '../ui/docs/colors.md',
          name: 'Colors',
        },
        {
          content: '../ui/docs/fonts.md',
          name: 'Fonts',
        },
      ],
    },
    {
      name: 'Atoms',
      components: '../ui/src/atoms/*.js',
    },
    {
      name: 'Molecules',
      components: '../ui/src/molecules/*.js',
    },
    {
      name: 'Core-components',
      components: '../components/packages/!(xpub-*)/**/*.{jsx,js}',
    },
    {
      name: 'Xpub-components',
      components: '../components/packages/xpub-*/**/*.{jsx,js}',
    },
  ],
  ignore: [
    '**/packages/Manage/**',
    '**/packages/**/*.config.js',
    '**/packages/*-server/**',
    '**/packages/MediumDraft/CustomImageSideButton.jsx',
    '**/packages/FormGroup/**',
    '**/node_modules/**',
    '**/*.test.{js,jsx}',
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    StyleGuideRenderer: require.resolve(
      '@pubsweet/styleguide/src/components/StyleGuideRenderer',
    ),
    Wrapper: require.resolve('@pubsweet/styleguide/src/components/Wrapper'),
  },
  title: 'PubSweet Styleguide',
  compilerConfig: {
    transforms: { dangerousTaggedTemplateString: true },
  },
  pagePerSection: true,
}
