module.exports = {
  context: {
    faker: 'faker',
  },
  styleguideComponents: {
    Wrapper: require.resolve('@pubsweet/styleguide/src/components/Wrapper'),
    StyleGuideRenderer: require.resolve(
      '@pubsweet/styleguide/src/components/StyleGuideRenderer',
    ),
  },
  components: 'packages/**/*.jsx',
  skipComponentsWithoutExample: true,
  serverPort: 6063,
  title: 'PubSweet Components',
  ignore: [
    '**/packages/Manage/**',
    '**/packages/InkBackend/**',
    '**/packages/PasswordResetBackend/**',
    '**/packages/MediumDraft/CustomImageSideButton.jsx',
    '**/node_modules/**',
    '**/*.test.{js,jsx}',
  ],
}
