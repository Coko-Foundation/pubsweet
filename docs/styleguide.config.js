module.exports = {
  context: {
    faker: 'faker',
  },
  sections: [
    {
      name: 'Theme variables',
      sections: [
        {
          content: '../packages/ui/docs/brand_colors.md',
          name: 'Brand colors',
        },
        {
          content: '../packages/ui/docs/state_colors.md',
          name: 'State colors',
        },
        {
          content: '../packages/ui/docs/fonts.md',
          name: 'Fonts',
        },
      ],
    },
    {
      name: 'Atoms',
      components: '../packages/ui/src/atoms/*.js',
    },
    {
      name: 'Molecules',
      components: '../packages/ui/src/molecules/*.js',
    },
    {
      name: 'Core-components',
      components: '../packages/components/!(xpub-*|model-*)/**/*.{jsx,js}',
    },
    {
      name: 'Xpub-components',
      components: '../packages/components/xpub-*/**/*.{jsx,js}',
    },
  ],
  ignore: [
    '**/components/Manage/**',
    '**/components/**/*.config.js',
    '**/components/*-server/**',
    '**/components/MediumDraft/CustomImageSideButton.jsx',
    '**/node_modules/**',
    '**/*.test.{js,jsx}',
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    // StyleGuideRenderer: require.resolve(
    //   '@pubsweet/styleguide/src/components/StyleGuideRenderer',
    // ),
    ComponentsListRenderer: require.resolve(
      './src/components/ComponentsListRenderer',
    ),
    SectionRenderer: require.resolve('./src/components/SectionRenderer'),
    Wrapper: require.resolve('./src/components/Wrapper'),
  },
  title: 'PubSweet Styleguide',
  pagePerSection: true,
}
